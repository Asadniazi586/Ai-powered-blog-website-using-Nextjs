import { assets } from '@/app/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100 h-screen sticky top-0'>
      {/* Logo Section */}
      <div className='px-2 sm:pl-14 py-3 border-b border-gray-600'>
        <Image src={assets.logo} width={120} alt=''/>
      </div>
      
      {/* Sidebar Content */}
      <div className='w-28 sm:w-80 flex-grow overflow-y-auto border-r border-gray-600'>
        <div className='w-[50%] sm:w-[80%] mx-auto py-12'>
          <Link href='/admin/addProduct' className='flex items-center border border-gray-600 gap-3 font-medium px-3 py-2 bg-white hover:bg-gray-100 transition-colors'>
            <Image src={assets.add_icon} alt='' width={28}/><p className='hidden sm:block'>Add blogs</p>
          </Link>
          <Link href='/admin/blogList' className='flex mt-5 items-center border border-gray-600 gap-3 font-medium px-3 py-2 bg-white hover:bg-gray-100 transition-colors'>
            <Image src={assets.blog_icon} alt='' width={28}/><p className='hidden sm:block'>Blog lists</p>
          </Link>
          <Link href='/admin/subscriptions' className='flex mt-5 items-center border border-gray-600 gap-3 font-medium px-3 py-2 bg-white hover:bg-gray-100 transition-colors'>
            <Image src={assets.email_icon} alt='' width={28}/><p className='hidden sm:block'>Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar