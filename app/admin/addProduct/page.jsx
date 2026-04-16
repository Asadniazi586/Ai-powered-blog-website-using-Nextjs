'use client'
export const dynamic = 'force-dynamic'

import { assets } from '@/app/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import '@/app/styles/tiptapEditor.css'

const Page = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Politics',
    author: 'Asad Niazi',
    authorImg: '/author_img.png'
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pl-5',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pl-5',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic',
        },
      }),
      HorizontalRule,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setData((prev) => ({ ...prev, description: html }))
    }
  })

  const generateContent = async () => {
    if (!data.title.trim()) {
      toast.error('Please enter a title to generate content.')
      return
    }

    try {
      setGenerating(true)
      toast.info('Generating content...')

      const { data: response } = await axios.post('/api/blog/generateContent', {
        prompt: data.title
      })

      if (response.success && response.content) {
        setData(prev => ({ ...prev, description: response.content }))
        editor?.commands.setContent(response.content)
        toast.success('Content generated successfully!')
      } else {
        throw new Error(response.error || 'No content generated')
      }
    } catch (error) {
      console.error('Generation Error:', error)
      toast.error(error.response?.data?.error || error.message || 'Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.title.trim()) {
      toast.error('Please enter a blog title')
      return
    }
    if (!data.description || data.description === '<p></p>') {
      toast.error('Please add content to your blog')
      return
    }
    if (!image) {
      toast.error('Please upload a thumbnail image')
      return
    }

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)
    formData.append('date', new Date().toISOString())

    try {
      setLoading(true)
      const response = await axios.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      if (response.data.success) {
        toast.success(response.data.msg || 'Blog added successfully!')
        setData({
          title: '',
          description: '',
          category: 'Politics',
          author: 'Asad Niazi',
          authorImg: '/author_img.png',
        })
        setImage(null)
        editor?.commands.clearContent()
      } else {
        toast.error(response.data.error || 'Something went wrong.')
      }
    } catch (error) {
      console.error('Submit Error:', error)
      toast.error(error.response?.data?.error || 'Server Error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-3 text-sm text-gray-500">Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Create New Blog</h1>
        <p className="text-gray-500 text-sm mt-1">Share your thoughts with the world</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        
        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
          <label htmlFor="image" className="cursor-pointer inline-block">
            {!image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 w-40 h-32 flex flex-col items-center justify-center hover:border-indigo-500 transition-colors bg-gray-50">
                <Image src={assets.upload_area} width={40} height={40} alt='Upload' className='opacity-50' />
                <p className="text-xs text-gray-400 mt-2">Click to upload</p>
              </div>
            ) : (
              <div className="relative w-40 h-32 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-sm">
                <img src={URL.createObjectURL(image)} alt='Preview' className='w-full h-full object-cover' />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </label>
          <input name='authorImg' type="file" onChange={(e) => setImage(e.target.files[0])} id='image' hidden />
          <p className="text-xs text-gray-400 mt-2">Recommended: 1200x800px, JPG or PNG</p>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Title</label>
          <input 
            onChange={handleChange} 
            value={data.title} 
            name='title' 
            type="text" 
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition'
            placeholder='Enter an engaging title...'
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
          
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 border border-gray-300 bg-gray-50 rounded-t-xl">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bold') ? 'bg-gray-200' : ''}`} title="Bold"><strong>B</strong></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('italic') ? 'bg-gray-200' : ''}`} title="Italic"><em>I</em></button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('underline') ? 'bg-gray-200' : ''}`} title="Underline"><u>U</u></button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded hover:bg-gray-200 transition text-sm font-bold ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}>H1</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-200 transition text-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}>H2</button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-gray-200 transition text-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}>H3</button>
            <div className="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`} title="Bullet List">• List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`} title="Numbered List">1. List</button>
            <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`} title="Quote">“ ”</button>
            <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-gray-200 transition" title="Divider">—</button>
            <button type="button" onClick={() => { const url = window.prompt('URL'); if (url) editor.chain().focus().setLink({ href: url }).run() }} className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive('link') ? 'bg-gray-200' : ''}`} title="Link">🔗</button>
          </div>
          
          {/* Editor */}
          <div className="relative">
            <EditorContent editor={editor} className="min-h-[350px] p-4 border border-t-0 border-gray-300 rounded-b-xl focus:outline-none prose max-w-none" />
            <button
              type="button"
              onClick={generateContent}
              disabled={!data.title || generating}
              className={`absolute bottom-3 right-3 px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition ${
                !data.title || generating 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              {generating ? (
                <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Generating...</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>AI Generate</>
              )}
            </button>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <select 
            name="category" 
            onChange={handleChange} 
            value={data.category} 
            className='w-48 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white'
          >
            <option value="Politics">🏛️ Politics</option>
            <option value="Wellness">🧘 Wellness</option>
            <option value="Culture">🎭 Culture</option>
            <option value="Lifestyle">🌿 Lifestyle</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={!data.title || !data.description || !image || loading}
          className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
            !data.title || !data.description || !image || loading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {loading ? (
            <><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Publishing...</>
          ) : (
            <>📝 Publish Blog</>
          )}
        </button>
      </form>
    </div>
  )
}

export default Page