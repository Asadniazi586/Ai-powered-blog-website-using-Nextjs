'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Categories = () => {
  const [categoryCounts, setCategoryCounts] = useState({
    Lifestyle: 0,
    Politics: 0,
    Wellness: 0,
    Culture: 0
  });

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await axios.get('/api/blog');
        const blogs = response.data.blogs;
        
        const normalizeCategory = (cat) => {
          if (!cat) return '';
          const trimmed = cat.trim();
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        };
        
        const counts = {
          Lifestyle: blogs.filter(blog => normalizeCategory(blog.category) === 'Lifestyle').length,
          Politics: blogs.filter(blog => normalizeCategory(blog.category) === 'Politics').length,
          Wellness: blogs.filter(blog => normalizeCategory(blog.category) === 'Wellness').length,
          Culture: blogs.filter(blog => normalizeCategory(blog.category) === 'Culture').length
        };
        
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };
    
    fetchCategoryCounts();
  }, []);

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Explore by Category
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Discover stories that matter to you
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { name: "Lifestyle", icon: "🌿", color: "hover:bg-green-50" },
            { name: "Politics", icon: "🏛️", color: "hover:bg-blue-50" },
            { name: "Wellness", icon: "🧘", color: "hover:bg-teal-50" },
            { name: "Culture", icon: "🎭", color: "hover:bg-purple-50" }
          ].map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.name.toLowerCase()}`}
              className={`group p-6 md:p-8 bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-xl text-center ${category.color}`}
            >
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-800 text-base md:text-lg group-hover:text-indigo-600">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                {categoryCounts[category.name]} {categoryCounts[category.name] === 1 ? 'article' : 'articles'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;