import mongoose, { mongo } from "mongoose";

const affiliateSchema = new mongoose.Schema({

    affiliate_id:{
        type:String,
        required:[true,"Please insert your affiliate ID"]
    },
    email:{
        type:String,
        required:[true,"Please insert the affiliate email"]
    },
    name:{
        type:String,
        required:[true,"Please insert the affiliate email"]
    }

},
{
        timestamps : true,
        versionKey:false
    })

export const AffiliateModel = mongoose?.models?.Affiliate|| mongoose.model("Affiliate", affiliateSchema)