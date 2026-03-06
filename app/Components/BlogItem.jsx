'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { assets } from '../Assets/assets'
import Link from 'next/link'
import DOMPurify from 'dompurify'

const BlogItem = ({ image, title, description, category, id }) => {
  const [expanded, setExpanded] = useState(false)

  const sanitizeHTML = (dirty) => {
    if (!dirty) return { __html: '' };
    
    const clean = DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'span', 'div'],
      ALLOWED_ATTR: ['class', 'href', 'target', 'rel']
    });
    
    return { __html: clean };
  };

  const getPlainTextPreview = (html) => {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  return (
    <div className='w-full max-w-[330px] bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300'>
      <Link href={`/blogs/${id}`}>
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={250}
          className='w-full h-[200px] object-cover border-b border-gray-300 hover:opacity-90 transition-opacity'
        />
      </Link>
      <div className='p-5'>
        <span className='inline-block px-3 py-1 mb-3 text-xs font-medium text-white bg-gray-700 rounded-full'>
          {category}
        </span>
        <h3 className='mb-2 text-lg font-semibold text-gray-900 line-clamp-2'>
          <Link href={`/blogs/${id}`} className='hover:text-blue-600 transition-colors'>
            {title}
          </Link>
        </h3>
        <div className='mb-4 text-sm text-gray-600'>
          {expanded ? (
            <div 
              className="prose max-w-none" 
              dangerouslySetInnerHTML={sanitizeHTML(description)} 
            />
          ) : (
            <p>{getPlainTextPreview(description)}</p>
          )}
          {description && description.length > 100 && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
              }}
              className='ml-1 text-blue-500 hover:underline'
            >
              {/* {expanded ? 'Show less' : '...Read more'} */}
            </button>
          )}
        </div>
        <Link 
          href={`/blogs/${id}`} 
          className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
        >
          Read full article
          <Image src={assets.arrow} alt='' width={12} height={12} className='ml-2'/>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;