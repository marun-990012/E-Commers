import Product from "../models/product-model.js";
import User from "../models/user-model.js";

const productController = {};

//list all the product
productController.list = async(req,res)=>{
    const product = await Product.find();

   return res.json(product);
};


//seller create product
productController.create = async(req,res)=>{
    const {name,price,description,images,category,seller,rejected} = req.body;
    // const body = req.body;
    try{
        const product = new Product({name,price,description,images,category,seller,rejected});
        product.seller=req.userId;
        await product.save()
       return res.status(201).json(product)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:"Something went wrong"})
    }
};

//seller update product
productController.update = async(req,res)=>{
    const id = req.params.id;
    const {name,price,description,image,category} = req.body;
    try{

        const body = {name,price,description,image,category,seller:req.userId}
        const oldProduct=await Product.findById(id);
        // console.log(req.userId==oldProduct.seller)
        if(req.userId==oldProduct.seller){
            const product = await Product.findByIdAndUpdate(id,body,{new:true});
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
       return res.json(product)
        }else{
            return res.json({message:"you cannot update this product"})
        }
        
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

//seller delete product
productController.remove = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
       return res.json(product)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

//seller approve product
productController.approve = async(req,res)=>{
    const id = req.params.id;
    const {isApproved,rejected}= req.body;
    try{
        const product = await Product.findByIdAndUpdate(id,{isApproved,rejected},{new:true});
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
       return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

//reject Product
// productController.reject = async(req,res)=>{
//     const id = req.params.id;
//     const {isApproved,rejected}= req.body;
//     try{
//         const product = await Product.findByIdAndUpdate(id,{isApproved,rejected},{new:true});
//         if(!product){
//             return res.status(404).json({error:"Product not found"})
//         }
//        return res.json(product);
//     }catch(error){
//         console.log(error)
//         return res.status(500).json({error:'Something went wrong'});
//     }
// };

//product belongs to seller
productController.show = async(req,res)=>{
    try{
        // console.log(req.userId)
        const product = await Product.find({seller:req.userId});
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
      return res.json(product)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};


//buyer can add enquiries to product
productController.addEnquiry = async(req,res)=>{
    const {messages,buyer,name} = req.body;
    const id=req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
        
        const enquiry={buyer:req.userId,messages,name};
        product.enquiries.push(enquiry);
        await product.save()
       return res.json(product)
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

//buyer can remove enquiry
productController.removeEnquiry = async (req,res) =>{
    const {id ,enid}= req.params;
    // console.log(req.params)

    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }
       const enquiry = product.enquiries.filter((ele)=>{
        // console.log(ele._id.toString())
        return ele._id.toString() !==enid;
    });

    const updateProduct= await Product.findByIdAndUpdate(id,{enquiries:enquiry},{new:true});
   return res.json(updateProduct)
   
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
}

//seller can response to enquiry
productController.responseToEnquiry = async(req,res)=>{
    const {enquiryId,response} = req.body;
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"Product not found"})
        }

        const enquiry = product.enquiries.id(enquiryId);
        if(!enquiry){
            return res.status(404).json({error:"enquiry not found"})
        }
        enquiry.response.push(response);
        product.save()
        // console.log(enquiry);
       return res.json(product)

    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};

//increase views
productController.showProduct = async (req,res)=>{
    const id = req.params.id;
    // const {views} = req.body;

    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"product not found"})
        }
        product.views++; //product.views+=1; or product.views=product.views+1;
        await product.save()
        return res.json(product)
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}


//mark as interested 
productController.interestedBuyer = async (req,res) =>{
    const id = req.params.id;
    // const {interestedBuyer} = req.body;

    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"product not found"})
        }

        const intId=product.interestedBuyers.filter((ele)=>{
            return ele.buyer == req.userId;
        })
        if(intId.length==0){
            product.interestedBuyers.push({buyer:req.userId});
            product.save();
           return res.json(product);
        }
       return res.json({message:"already interested "})
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};

//remove interested buyer
productController.removeInterestedBuyer = async (req,res) =>{
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error:"product not found"})
        }
        const index = product.interestedBuyers.findIndex((ele)=>{
            return ele.buyer ==req.userId;
        });

        product.interestedBuyers.splice(index,1);
        await product.save();
       return res.json(product);
        // console.log(index)
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
};

productController.addToCart= async(req,res)=>{
    const id=req.params.id;
    // console.log(req.userId,id);

    try{
        const user = await User.findById(req.userId);
        user.cart.push(id);
        user.save();
        // console.log(user);
        res.json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
    
};

productController.removeCart=async(req,res)=>{
    // res.json('invoked');
    const id=req.params.id;
    try{
        const user=await User.findById(req.userId);

        const index=user.cart.findIndex((ele)=>{
            return ele==id;
        });

        user.cart.splice(index,1);
        user.save()
        res.json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
}

export default productController;