import mongoose, { Schema } from "mongoose";

let AdsrunSchema = new Schema({
    link:{
        type: String,
        required: true
    },
    image: [{
        path:{
            type: String
        }
    }]
})

let Ads = mongoose.models.Ads || mongoose.model('Ads', AdsrunSchema);
export default Ads;
