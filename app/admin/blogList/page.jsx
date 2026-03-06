'use client'
import BlogTableItem from '@/app/Components/AdminComponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/blog')
      setBlogs(response.data.blogs)
    } catch (error) {
      toast.error('Failed to fetch blogs')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const DeleteBlogs = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          id: mongoId
        }
      })
      toast.success(response.data.msg)
      fetchBlogs()
    } catch (error) {
      toast.error('Failed to delete blog')
      console.error(error)
    }
  }

  // Helper function to format date from createdAt
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

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th className='hidden sm:block px-6 py-3' scope='col'>
                  Author Name
                </th> 
                <th className='px-6 py-3' scope='col'>
                  Blog Title
                </th>
                <th className='px-6 py-3' scope='col'>
                  Date
                </th> 
                <th className='px-6 py-3' scope='col'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((item, index) => (
                  <BlogTableItem 
                    key={index} 
                    deleteBlog={DeleteBlogs} 
                    mongoId={item._id} 
                    title={item.title} 
                    author={item.author} 
                    authorImg={item.authorImg} 
                    // ✅ Use createdAt instead of date
                    date={formatDate(item.createdAt)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default page