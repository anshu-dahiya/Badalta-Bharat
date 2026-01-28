import mongoose from 'mongoose';

let AboutSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["en", "hi"],
        required: true,
      },
},{timestamps: true});

let About = mongoose.models.About || mongoose.model('About', AboutSchema);

export default About;

