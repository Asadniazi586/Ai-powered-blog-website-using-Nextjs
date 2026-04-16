'use client'
import React, { useState } from 'react'

const SubTableItem = ({ mongoId, email, date, deleteEmail }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'Invalid date'
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  }

  const handleDelete = async () => {
    if (confirm('Remove this subscriber?')) {
      setIsDeleting(true)
      await deleteEmail(mongoId)
      setIsDeleting(false)
    }
  }

  return (
    <tr className='hover:bg-gray-50 transition-colors'>
      <td className='px-6 py-4'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0'>
            <svg className='w-4 h-4 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
            </svg>
          </div>
          <span className='text-gray-700 font-medium text-sm break-all'>{email}</span>
        </div>
      </td>
      <td className='px-6 py-4'>
        <span className='text-gray-500 text-sm'>{formatDate(date)}</span>
       </td>
      <td className='px-6 py-4'>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`flex items-center gap-1 px-2 py-1 text-sm rounded-lg transition-colors ${
            isDeleting 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          {isDeleting ? (
            <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
            </svg>
          ) : (
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
            </svg>
          )}
          <span className='hidden sm:inline'>Remove</span>
        </button>
       </td>
    </tr>
  )
}

export default SubTableItem