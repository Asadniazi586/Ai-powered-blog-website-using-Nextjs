'use client'
import { assets } from '@/app/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  
  const BlogDate = new Date(date)
  const formattedDate = !isNaN(BlogDate.getTime()) 
    ? BlogDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Invalid date'

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setIsDeleting(true)
      await deleteBlog(mongoId)
      setIsDeleting(false)
    }
  }

  return (
    <tr className='border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200'>
      {/* Author Column */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0'>
            <Image 
              width={32} 
              height={32} 
              src={authorImg || assets.profile_icon} 
              alt={author || 'Author'}
              className='object-cover w-full h-full'
            />
          </div>
          <p className='font-medium text-gray-800 text-sm'>{author || 'Anonymous'}</p>
        </div>
      </td>
      
      {/* Title Column */}
      <td className='px-4 py-3'>
        <p className='font-medium text-gray-800 text-sm line-clamp-1 max-w-[200px]'>
          {title || 'Untitled'}
        </p>
      </td>
      
      {/* Date Column */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-1.5'>
          <svg className='w-3.5 h-3.5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <span className='text-gray-600 text-sm'>{formattedDate}</span>
        </div>
      </td>
      
      {/* Action Column - Delete Button */}
      <td className='px-4 py-3'>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`
            group flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all duration-200
            ${isDeleting 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'text-red-500 hover:bg-red-50 hover:text-red-700'
            }
          `}
        >
          {isDeleting ? (
            <>
              <svg className='animate-spin w-3.5 h-3.5' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
              </svg>
              <span className='text-xs'>Deleting...</span>
            </>
          ) : (
            <>
              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
              </svg>
              <span className='text-xs hidden sm:inline'>Delete</span>
            </>
          )}
        </button>
      </td>
    </tr>
  )
}

export default BlogTableItem