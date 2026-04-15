'use client'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios'
import Link from 'next/link'

const BlogList = () => {
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
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <div className="text-sm">Loading blogs...</div>
        </div>
    )

    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>
    if (!blogData.length) return <div className="text-center py-10">No blogs found</div>

    const categoryOrder = ['Politics', 'Wellness', 'Culture', 'Lifestyle']

    const blogsByCategory = categoryOrder.reduce((acc, category) => {
        acc[category] = blogData.filter(blog => blog.category === category)
        return acc
    }, {})

    return (
        <div className="container mx-auto px-4">
            {categoryOrder.map((category) => {
                const categoryBlogs = blogsByCategory[category]
                if (categoryBlogs.length === 0) return null

                const visibleBlogs = categoryBlogs.slice(0, 4)

                return (
                    <div key={category} className="mb-12">
                        {/* Category Heading */}
                        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 mb-6">
                            {category}
                        </h2>

                        {/* Responsive Grid - Cards centered on mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
                            {visibleBlogs.map((item) => (
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

                        {/* See More Button */}
                        {categoryBlogs.length > 4 && (
                            <div className="text-center mt-6">
                                <Link 
                                    href={`/category/${category.toLowerCase()}`}
                                    className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
                                >
                                    See More →
                                </Link>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default BlogList