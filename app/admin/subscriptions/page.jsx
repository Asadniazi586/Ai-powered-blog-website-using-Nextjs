'use client'
import SubTableItem from '@/app/Components/AdminComponents/SubTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true) // Add loading state

  const fetchEmails = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/blog/email')
      setEmails(response.data.emails)
    } catch (error) {
      toast.error('Failed to fetch subscriptions')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog/email',{
        params: {
          id: mongoId
          }
      })
      if (response.data.success) {
        toast.success(response.data.msg)
        fetchEmails()
        }else{
          toast.error('error')
        }
        } catch (error) {
          toast.error('Failed to delete subscription')
          console.error(error)
        }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        {loading ? (
          // Spinner while loading
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th className='px-6 py-3' scope='col'>Email Subscription</th>
                <th className='px-6 py-3 hidden sm:block' scope='col'>Date</th>
                <th className='px-6 py-3' scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {emails.length > 0 ? (
                emails.map((item, index) => (
                  <SubTableItem 
                    key={index} 
                    mongoId={item._id} 
                    email={item.email} 
                    date={item.date}
                    deleteEmail={deleteEmail}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No subscriptions found
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