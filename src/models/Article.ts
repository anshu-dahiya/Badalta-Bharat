import mongoose from "mongoose";

let ArticleSchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    shortDescription:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }, 
   image:[{
        path: {
            type: String,
        }}
    ],
   category: {
        type: String,       
        required: true  
   },
   status: {
       type: String,
       enum: ['published', 'draft'],
       default: 'draft'
   },
   language: {
    type: String,
    enum: ["en", "hn"],
    required: true,
  },
}, {timestamps: true})

let Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export default Article;