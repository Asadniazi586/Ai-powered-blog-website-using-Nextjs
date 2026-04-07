'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { assets } from '../Assets/assets'

const Footer = () => {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={assets.logo_light} alt="Logo" width={140} height={40} className="object-contain"/>
          <span className="hidden sm:block text-sm text-gray-300">All rights reserved © {year}</span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, idx) => (
            <a
              key={idx}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Image src={icon} alt="" width={32} height={32} className="object-contain"/>
            </a>
          ))}
        </div>

        {/* Mobile copyright */}
        <div className="sm:hidden text-sm text-gray-300 mt-4 md:mt-0">
          All rights reserved © {year}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 mt-4">
        <p className="text-center text-gray-400 text-xs py-3">
          Designed and powered by Insight Chronicle
        </p>
      </div>
    </footer>
  )
}

export default Footer