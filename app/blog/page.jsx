'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../Components/BlogItem";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const categories = ["All", "Politics", "Wellness", "Culture", "Lifestyle"];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog");
        const data = res.data.blogs || [];
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  // Filter logic
  useEffect(() => {
    let temp = [...blogs];

    // Filter by category
    if (activeCategory !== "All") {
      temp = temp.filter(
        (b) => b.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search filter
    if (search.trim()) {
      temp = temp.filter(
        (b) =>
          b.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredBlogs(temp);
  }, [search, activeCategory, blogs]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Main Content - grows to push footer down */}
      <main className="flex-grow px-4 py-10">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Explore Articles
        </h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No articles found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
        )}
      </main>

      {/* Footer - Full width, sticks to bottom */}
      <Footer />
    </div>
  );
}