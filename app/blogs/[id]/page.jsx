'use client'
import { assets } from '@/app/Assets/assets'
import Footer from '@/app/Components/Footer'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

const Page = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const router = useRouter()

  const sanitizeHTML = (dirty) => {
    if (!dirty) return { __html: '' };
    
    const clean = DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'span', 'div'],
      ALLOWED_ATTR: ['class', 'href', 'target', 'rel']
    });
    
    return { __html: clean };
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return '';
    
    // Handle both ISO strings and Date objects
    const date = new Date(dateInput);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateInput);
      return '';
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchBlogData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/blog?id=${params.id}`)
      if (response.data) {
        setData(response.data)
      } else {
        setError('Blog not found')
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch blog')
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogData()
  }, [params.id])

  if (loading) return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
    </div>
  )

  if (error) return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <p className='text-red-500 mb-4'>{error}</p>
        <button 
          onClick={() => router.push('/blogs')}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
        >
          Back to Blogs
        </button>
      </div>
    </div>
  )

  if (!data) return null

  return (
    <>
      <div className='bg-gray-100 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href={'/'}>
            <Image 
              src={assets.logo} 
              alt='Website Logo' 
              width={180} 
              height={60}
              className='w-[130px] sm:w-auto'
              priority
            />
          </Link>
          <Link 
            href={'/'} 
            className='flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors'
          >
            All Blogs <Image src={assets.arrow} alt="Arrow icon" width={16} height={16}/>
          </Link>
        </div>
        <div className='text-center my-16 sm:my-24'>
          <h1 className='text-2xl sm:text-4xl lg:text-5xl font-bold max-w-4xl mx-auto leading-tight'>
            {data.title}
          </h1>
          <div className='flex items-center justify-center mt-8 gap-3'>
            <Image 
              className='border-2 border-white rounded-full'
              src={data.authorImg} 
              width={50} 
              height={50} 
              alt={data.author}
            />
            <div className='text-left'>
              <p className='font-medium'>{data.author}</p>
              <p className='text-sm text-gray-500'>
                {formatDate(data.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-5 max-w-4xl md:mx-auto mt-[-80px] mb-16'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <Image 
            className='w-full h-auto max-h-[500px] object-cover'
            src={data.image} 
            width={1200} 
            height={630} 
            alt={data.title}
            priority
          />
          
          <div className='p-6 sm:p-8'>
            <div 
              className='prose max-w-none'
              dangerouslySetInnerHTML={sanitizeHTML(data.description)}
            />

            <div className='mt-16 pt-8 border-t border-gray-200'>
              <h3 className='text-lg font-semibold mb-4'>Share this article</h3>
              <div className='flex gap-4'>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='hover:opacity-75 transition-opacity'
                >
                  <Image src={assets.facebook_icon} width={40} height={40} alt='Share on Facebook'/>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(data.title)}`} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='hover:opacity-75 transition-opacity'
                >
                  <Image src={assets.twitter_icon} width={40} height={40} alt='Share on Twitter'/>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(data.title)}`} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='hover:opacity-75 transition-opacity'
                >
                  <Image src={assets.googleplus_icon} width={40} height={40} alt='Share on LinkedIn'/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Page