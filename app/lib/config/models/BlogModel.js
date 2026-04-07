import mongoose from "mongoose";

// Define the categories as a constant for reuse
const VALID_CATEGORIES = ['Lifestyle', 'Politics', 'Wellness', 'Culture','Startup']; // Added 'Startup'

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
        enum: VALID_CATEGORIES,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toISOString()
    },
}, {
    timestamps: true,
    toJSON: { getters: true }
});

// Add index for better query performance
blogSchema.index({ title: 'text', category: 1 });

// Delete the existing model if it exists to force schema update
if (mongoose.models.blog) {
    delete mongoose.models.blog;
}

const BlogModel = mongoose.model("blog", blogSchema);

export default BlogModel;