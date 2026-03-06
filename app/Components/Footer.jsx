import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { assets } from '../Assets/assets'

const Footer = () => {
   const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-gray-600 py-5 items-center'>
        <Image src={assets.logo_light} alt='' width={120}/>
        <p className='text-sm text-white'>All right reserved. Copyright &copy;{year}</p>
        <div className='flex'>
          <Image src={assets.facebook_icon} alt='' width={40}/>
          <Image src={assets.twitter_icon} alt='' width={40}/>
          <Image src={assets.googleplus_icon} alt='' width={40}/>
        </div>
    </div>
  )
}

export default Footer