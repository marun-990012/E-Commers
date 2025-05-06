import {validationResult} from 'express-validator';
import Category from '../models/category-model.js';
import Product from '../models/product-model.js';

const categoryController = {}

categoryController.list = async(req,res)=>{
    const categories = await Category.find()
   return res.json(categories)
};

categoryController.create = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const body = req.body;
    try{
        const category = await Category.create(body);
      return res.json(category)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wron"})
    }
};


categoryController.show = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const id = req.params.id;
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
       return res.json(category);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wron"})
    }
};

categoryController.remove = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const id = req.params.id;

    try{

        const category1 = await Category.findByIdAndDelete(id);
        const product = await Product.deleteMany({category:id});
        if(!category1){
            return res.status(404).json({error:"Category not found"})
        }
       return res.json({category1,product});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }

};

categoryController.update = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }
    const id = req.params.id;
    const body = req.body;

    try{
        const category = await Category.findByIdAndUpdate(id,body,{new:true});
        if(!category){
            return res.status(404).json({error:"Category not found"})
        }
       return res.json(category);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wron"})
    }
}

export default categoryController;

