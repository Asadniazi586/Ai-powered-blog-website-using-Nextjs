'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'

const BlogList = () => {
    const [menu, setMenu] = useState('All')
    const [blogData, setBlogData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchBlogData = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/blog')
            const formattedData = response.data.blogs.map(blog => ({
                ...blog,
                description: blog.description || ''
            }))
            setBlogData(formattedData)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching blog data:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogData()
    }, [])

   if (loading) return (
    <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <div>Loading blogs...</div>
    </div>
)

    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>
    if (!blogData.length) return <div className="text-center py-10">No blogs found</div>

    const filteredBlogs = menu === 'All' 
        ? blogData 
        : blogData.filter(item => item.category === menu)

    return (
        <div>
            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu('All')} className={menu === 'All' ? 'bg-gray-600 text-white py-1 px-4 rounded-sm' : ''}>All</button>
                <button onClick={() => setMenu('Technology')} className={menu === 'Technology' ? 'bg-gray-600 text-white py-1 px-4 rounded-sm' : ''}>Technology</button>
                <button onClick={() => setMenu('Startup')} className={menu === 'Startup' ? 'bg-gray-600 text-white py-1 px-4 rounded-sm' : ''}>Startup</button>
                <button onClick={() => setMenu('Lifestyle')} className={menu === 'Lifestyle' ? 'bg-gray-600 text-white py-1 px-4 rounded-sm' : ''}>Lifestyle</button>
            </div>
            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {filteredBlogs.map((item) => (
                    <BlogItem 
                        key={item._id} 
                        id={item._id} 
                        image={item.image} 
                        title={item.title} 
                        description={item.description} 
                        category={item.category}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlogList