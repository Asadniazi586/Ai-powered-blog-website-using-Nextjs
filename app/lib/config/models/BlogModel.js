import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authorImg: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Technology', 'Startup', 'Lifestyle'], // Added enum for validation
    },
    createdAt: {  // Changed from 'date' to 'createdAt' for consistency
        type: Date,
        default: Date.now,
        get: (date) => date.toISOString() // Ensure consistent format when retrieved
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: { getters: true } // Ensure getters are applied when converting to JSON
});

// Add index for better query performance
blogSchema.index({ title: 'text', category: 1 });

const BlogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default BlogModel;