'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BlogItem from '@/app/Components/BlogItem'
import axios from 'axios'
import Navbar from '@/app/Components/Navbar'
import Footer from '@/app/Components/Footer'
import Link from 'next/link'

const CategoryPage = () => {
    const params = useParams()
    const categoryParam = params.category // e.g., 'politics'
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    const fetchCategoryBlogs = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/blog')
            const allBlogs = response.data.blogs || []
            const filteredBlogs = allBlogs.filter(
                blog => blog.category?.toLowerCase() === categoryParam?.toLowerCase()
            )
            setBlogs(filteredBlogs)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categoryParam) {
            fetchCategoryBlogs()
        }
    }, [categoryParam])

    // Filter blogs by search
    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(search.toLowerCase()) ||
        blog.description?.toLowerCase().includes(search.toLowerCase())
    )

    // Capitalize first letter of category for heading
    const categoryHeading = categoryParam 
        ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) 
        : ''

    // Category icon mapping
    const getCategoryIcon = () => {
        const icons = {
            politics: '🏛️',
            wellness: '🧘',
            culture: '🎭',
            lifestyle: '🌿'
        }
        return icons[categoryParam?.toLowerCase()] || '📝'
    }

    // Category color mapping
    const getCategoryColor = () => {
        const colors = {
            politics: 'from-red-600 to-orange-600',
            wellness: 'from-emerald-600 to-teal-600',
            culture: 'from-purple-600 to-pink-600',
            lifestyle: 'from-blue-600 to-indigo-600'
        }
        return colors[categoryParam?.toLowerCase()] || 'from-indigo-600 to-purple-600'
    }

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-gray-500">Loading {categoryHeading} articles...</p>
                </div>
            </div>
            <Footer />
        </>
    )

    if (error) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
            <Footer />
        </>
    )

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <div className={`bg-gradient-to-r ${getCategoryColor()} py-16`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                        <span className="text-4xl">{getCategoryIcon()}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {categoryHeading}
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Explore all articles related to {categoryHeading.toLowerCase()}
                    </p>
                    <div className="mt-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'Article' : 'Articles'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="max-w-md mx-auto">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder={`Search in ${categoryHeading}...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
                            <p className="text-gray-400 mb-6">
                                {search ? `No results matching "${search}"` : `No articles in ${categoryHeading} yet`}
                            </p>
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Clear Search
                                </button>
                            )}
                            {!search && (
                                <Link 
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                    Browse all articles →
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Results count */}
                            {search && (
                                <p className="text-sm text-gray-500 mb-4 text-center">
                                    Found {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'} for "{search}"
                                </p>
                            )}
                            
                            {/* Blog Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredBlogs.map((blog) => (
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
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    )
}

export default CategoryPage