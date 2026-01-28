import mongoose from "mongoose";


let PdfSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["en", "hn"],
        required: true,
      },
}, {timestamps: true})

let Pdf = mongoose.models.Pdf || mongoose.model('Pdf', PdfSchema);
export default Pdf;