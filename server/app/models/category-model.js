import mongoose from "mongoose";

const {Schema,model} = mongoose;

const categorySchema = new Schema({
    name:String
},{timestamps:true});

const Category = model('Category',categorySchema);

export default Category;