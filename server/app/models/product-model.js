import mongoose from "mongoose";
import Category from "./category-model.js";
import User from "./user-model.js";

const {Schema,model} = mongoose;

const productSchema = new Schema({
    name:String,
    price:Number,
    description:String,
    images:[],
    category:Schema.Types.ObjectId,
    seller:{
        type:Schema.Types.ObjectId,
    },
    isApproved:{
        type:Boolean,
        default:false
    },
    enquiries:[{
        buyer:Schema.Types.ObjectId,
        messages:String,
        response:[],
        name:String
    }],
    views:{
        type:Number,
        default:0
    },
    rejected:{
        type:Boolean,
        default:false
    },
    interestedBuyers:[]
},{timestamps:true});

const Product = model('Product',productSchema);

export default Product;