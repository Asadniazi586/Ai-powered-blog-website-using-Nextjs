import { connectDB } from "@/app/lib/config/db";
import BlogModel from "@/app/lib/config/models/BlogModel.js";
import { writeFile } from "fs/promises";

const fs = require('fs')
const { NextResponse } = require("next/server");

const loadDB = async ()=>{
    await connectDB()
}
loadDB()

export async function GET(request) {
    const id = request.nextUrl.searchParams.get('id')
    if(id){
        const blog = await BlogModel.findById(id)
        return NextResponse.json(blog)
    }else{
        const blogs = await BlogModel.find({})
        return NextResponse.json({ blogs })
    }
}

export async function POST(request) {
   try {
    const formData = await request.formData()
    const timestamp = Date.now()
    const image = formData.get("image")
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData)
    const path = `./public/${timestamp}_${image.name}`
    await writeFile(path,buffer)
    const imgUrl = `/${timestamp}_${image.name}`
    
    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`,
        // ✅ Use createdAt instead of date (matches schema)
        createdAt: new Date()
    }
    
    await BlogModel.create(blogData)
    return NextResponse.json({ success:true,msg:'Blog Added Successfully!'})
   } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message })
   }
}

//api for deleting blogs
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id')
    const blog = await BlogModel.findById(id)
    fs.unlink(`./public${blog.image}`,()=>{})
    await BlogModel.findByIdAndDelete(id)
    return NextResponse.json({msg:'Blog Deleted'})
}