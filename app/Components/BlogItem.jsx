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
    return text.length > 80 ? text.substring(0, 80) + '...' : text;
  };

  return (
    <div className='w-full mx-auto max-w-[270px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
      
      <Link href={`/blogs/${id}`}>
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={250}
          className='w-full h-[150px] object-cover hover:opacity-90 transition'
        />
      </Link>

      <div className='p-4'>
        <span className='inline-block px-2 py-1 mb-2 text-[10px] font-medium text-white bg-gray-700 rounded-full'>
          {category}
        </span>

        <h3 className='mb-1 text-sm font-semibold text-gray-900 line-clamp-2'>
          <Link href={`/blogs/${id}`} className='hover:text-blue-600 transition'>
            {title}
          </Link>
        </h3>

        <div className='mb-3 text-xs text-gray-600 leading-relaxed'>
          {expanded ? (
            <div 
              className="prose max-w-none text-xs" 
              dangerouslySetInnerHTML={sanitizeHTML(description)} 
            />
          ) : (
            <p>{getPlainTextPreview(description)}</p>
          )}
        </div>

        <Link 
          href={`/blogs/${id}`} 
          className='inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition'
        >
          Read more
          <Image src={assets.arrow} alt='' width={10} height={10} className='ml-1'/>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;