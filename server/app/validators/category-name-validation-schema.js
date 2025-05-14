
import Category from "../models/category-model.js"
export const categoryValidationSchema = {
    name:{
        in:['body'],
        exists:{
            errorMessage:"Name field is required"
        },
        notEmpty:{
            errorMessage:"Name field should not be empty"
        },
        trim:true,
        custom:{
            options:async function(value){
                try{
                    const category = await Category.findOne({name:value})
                    if(category){
                        throw new Error('category already exists')
                    }
                }catch(error){
                    throw new Error(error.message)
                }
                return true;
            }
        }
    }
}
