'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BlogItem from '@/app/Components/BlogItem'
import axios from 'axios'

const CategoryPage = () => {
    const params = useParams()
    const categoryParam = params.category // e.g., 'politics'
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategoryBlogs = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/blog')
            const allBlogs = response.data.blogs || []
            const filteredBlogs = allBlogs.filter(
                blog => blog.category.toLowerCase() === categoryParam.toLowerCase()
            )
            setBlogs(filteredBlogs)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryBlogs()
    }, [categoryParam])

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <div className="text-sm">Loading blogs...</div>
        </div>
    )

    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>
    if (!blogs.length) return <div className="text-center py-10">No blogs found in this category</div>

    // Capitalize first letter of category for heading
    const categoryHeading = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 border-b-4 border-blue-500 pb-2">
                {categoryHeading} Articles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogs.map(blog => (
                    <BlogItem 
                        key={blog._id}
                        id={blog._id}
                        image={blog.image}
                        title={blog.title}
                        description={blog.description}
                        category={blog.category}
                    />
                ))}
            </div>
        </div>
    )
}

export default CategoryPage