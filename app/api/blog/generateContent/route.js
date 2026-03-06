import { NextResponse } from "next/server";
import main from "@/app/utils/gemini";

const cleanGeneratedHTML = (html) => {
  if (!html) return '';
  
  // Remove unwanted document structure and markdown
  let cleaned = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>.*?<\/head>/gis, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/```html/g, '')
    .replace(/```/g, '')
    .trim();

  // Remove any remaining unwanted tags (except allowed ones)
  const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'span', 'div'];
  const tagRegex = new RegExp(`<(?!\/?(${allowedTags.join('|')})\s*\/?)[^>]+>`, 'gi');
  cleaned = cleaned.replace(tagRegex, '');

  // Fix common HTML issues
  cleaned = cleaned
    .replace(/<(\w+)[^>]*>\s*<\/\1>/g, '') // Remove empty tags
    .replace(/\n\s*\n/g, '\n') // Remove excessive newlines
    .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'); // Add target blank to links

  return cleaned;
};

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }
    
    const generationPrompt = `
      Generate a detailed blog post based on title: "${prompt}".
      Requirements:
      1. Return ONLY the content that would appear within <body> tags
      2. Use ONLY these HTML elements: 
         <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, 
         <p>, <br>, <ul>, <ol>, <li>, 
         <strong>, <em>, <a>, <span>, <div>
      3. Do NOT include:
         - <html>, <head>, <body> tags
         - Document type declarations
         - Markdown formatting
         - Code blocks or triple backticks
      4. Ensure proper HTML structure and nesting
      5. Include relevant class names for styling where appropriate
      6. Make sure all links have target="_blank" and rel="noopener noreferrer"
    `;

    const rawContent = await main(generationPrompt);
    const cleanedContent = cleanGeneratedHTML(rawContent);

    return NextResponse.json({
      success: true,
      content: cleanedContent,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate content",
      },
      { status: 500 }
    );
  }
}