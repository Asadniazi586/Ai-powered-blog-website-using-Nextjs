import React from 'react'

const SubTableItem = ({email,mongoId,date,deleteEmail}) => {
    const emailDate = new Date(date);
  return (
    <tr className='border-b bg-white text-left'>
        <th className='px-6 py-4 text-gray-900 whitespace-nowrap'>
           {email?email:"No Email Provided"}
        </th>
        <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
        <td className='px-6 py-4 cursor-pointer' onClick={()=>deleteEmail(mongoId)}>x</td>
    </tr>
  )
}

export default SubTableItem