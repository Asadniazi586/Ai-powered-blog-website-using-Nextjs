'use client'
import { assets } from '@/app/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ onMobileClose }) => {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Add Blog',
      href: '/admin/addProduct',
      icon: assets.add_icon,
      iconAlt: 'Add blog'
    },
    {
      name: 'Blog List',
      href: '/admin/blogList',
      icon: assets.blog_icon,
      iconAlt: 'Blog list'
    },
    {
      name: 'Subscriptions',
      href: '/admin/subscriptions',
      icon: assets.email_icon,
      iconAlt: 'Subscriptions'
    }
  ]

  const isActive = (href) => pathname === href

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose()
    }
  }

  return (
    <div className="flex flex-col bg-white h-full min-h-screen w-64 sm:w-72 lg:w-64 xl:w-72 shadow-lg">
      {/* Logo Section */}
      <div className='px-4 py-5 border-b border-gray-100 flex-shrink-0'>
        <div className='flex justify-center sm:justify-start'>
          <Image src={assets.logo} width={100} height={40} alt='Logo' className='object-contain' />
        </div>
      </div>
      
      {/* Sidebar Navigation */}
      <div className='flex-1 py-6 overflow-y-auto'>
        <div className='px-3 space-y-2'>
          {menuItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link 
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-l-4 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0
                  ${active 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                    : 'bg-gray-100'
                  }
                `}>
                  <Image 
                    src={item.icon} 
                    alt={item.iconAlt} 
                    width={18} 
                    height={18}
                    className={active ? 'brightness-0 invert' : 'opacity-70'}
                  />
                </div>
                <span className={`font-medium text-sm ${active ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {item.name}
                </span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar