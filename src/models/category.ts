import mongoose from "mongoose";


let CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
}, {timestamps: true})

let Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

export default Category;