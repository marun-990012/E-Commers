import mongoose from "mongoose";
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['admin','buyer','seller']
    },
    isActive:{
        type:Boolean,
        default:false
        
    },
    cart:[],
    profileImage:String
},{timestamps:true});

const User = model('User',userSchema);

export default User;