let mongoose = require('mongoose');

    let UserCartSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        token:{
            type: String,
            required: true
        },
        expiretime: {
            type: Date,
            required: true
        }
        
    }, { timestamps: true });
let UserCart  = mongoose.models.UserCart || mongoose.model('UserCart' , UserCartSchema);

export default UserCart;