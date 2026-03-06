'use client'

// Change from 'revalidate' to something else
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
  // ... rest of your component code stays exactly the same
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
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
      const response = await axios.post('/api/blog', formData)
      if (response.data.success) {
        toast.success(response.data.msg)
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: 'Asad Niazi',
          authorImg: '/author_img.png',
        })
        setImage(null)
        editor?.commands.clearContent()
      } else {
        toast.error('Something went wrong.')
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Server Error')
    } finally {
      setLoading(false)
    }
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-600">Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <form className='pt-5 px-5 sm:pt-12 sm:pl-16' onSubmit={handleSubmit}>
      <p className='text-xl font-medium text-gray-700'>Upload Thumbnail</p>
      <label htmlFor="image" className="cursor-pointer">
        {!image ? (
          <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 w-36 h-24 flex items-center justify-center">
            <Image 
              src={assets.upload_area} 
              width={140} 
              height={70} 
              alt='Upload Placeholder' 
              className='object-contain'
            />
          </div>
        ) : (
          <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-1 w-36 h-24 flex items-center justify-center">
            <img 
              src={URL.createObjectURL(image)} 
              width={140} 
              height={70} 
              alt='Thumbnail Preview' 
              className='object-cover w-full h-full rounded-md'
            />
          </div>
        )}
      </label>
      <input 
        name='authorImg' 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
        id='image' 
        hidden 
        required 
      />

      <p className='text-xl font-medium text-gray-700 mt-6'>Blog title</p>
      <input 
        onChange={handleChange} 
        value={data.title} 
        name='title' 
        type="text" 
        className='w-full sm:w-[500px] mt-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
        placeholder='Enter blog title' 
        required 
      />

      <div className="w-full sm:w-[800px] mt-6">
        <label className="text-xl font-medium text-gray-700">Content</label>
        
        {/* Editor Menu Bar */}
        <div className="flex flex-wrap gap-1 p-2 border-t border-l border-r border-gray-300 bg-gray-50 rounded-t-md">
          {/* Text formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
            title="Bold"
          >
            <strong className="font-bold">B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
            title="Italic"
          >
            <em className="italic">I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
            title="Underline"
          >
            <u className="underline">U</u>
          </button>
          
          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
            title="Heading 1"
          >
            <span className="font-bold text-lg">H1</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
            title="Heading 2"
          >
            <span className="font-bold text-base">H2</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
            title="Heading 3"
          >
            <span className="font-bold text-sm">H3</span>
          </button>
          
          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
            title="Numbered List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="6" x2="21" y2="6"></line>
              <line x1="10" y1="12" x2="21" y2="12"></line>
              <line x1="10" y1="18" x2="21" y2="18"></line>
              <path d="M4 6h1v4"></path>
              <path d="M4 10h2"></path>
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
            </svg>
          </button>
          
          {/* Blockquote */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
            title="Blockquote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
          
          {/* Horizontal Rule */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded hover:bg-gray-200"
            title="Horizontal Line"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          
          {/* Link */}
          <button
            type="button"
            onClick={() => {
              const previousUrl = editor.getAttributes('link').href
              const url = window.prompt('URL', previousUrl)

              if (url === null) return
              if (url === '') {
                editor.chain().focus().extendMarkRange('link').unsetLink()
                return
              }
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </button>
        </div>
        
        {/* Editor Content */}
        <div className="relative">
          <EditorContent 
            editor={editor} 
            className="h-[350px] overflow-auto p-4 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button
            type="button"
            onClick={generateContent}
            disabled={!data.title || generating}
            className={`absolute right-2 bottom-2 px-4 py-2 text-sm rounded-md flex items-center ${!data.title || generating ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {generating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Generate with AI
              </>
            )}
          </button>
        </div>
      </div>

      <p className='text-xl font-medium text-gray-700 mt-6'>Blog Category</p>
      <select 
        name="category" 
        onChange={handleChange} 
        value={data.category} 
        className='w-40 mt-4 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      >
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <button
        type='submit'
        disabled={!data.title || !data.description || !image || loading}
        className={`mt-8 w-40 h-12 rounded-xl mb-5 flex items-center justify-center ${!data.title || !data.description || !image || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : 'Add Blog'}
      </button>
    </form>
  )
}

export default Page