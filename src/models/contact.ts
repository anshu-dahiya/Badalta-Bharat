import mongoose from "mongoose";



let ContactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

let Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
export default Contact;