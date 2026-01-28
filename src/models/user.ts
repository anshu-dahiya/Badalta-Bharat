import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword:{
        type: String,
        required: true
    },
    usercart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCart',
        required: false
    }]
}, {timestamps: true});

let User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;