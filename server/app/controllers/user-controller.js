import {validationResult} from 'express-validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const userController={};

//**** user registeration controller
userController.register = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    const body=req.body;
    console.log(body);
    // console.log(body.password,body.password.length)
    
    try{
        const totalUser= await User.countDocuments();
        // console.log(totalUser);
        const user = new User(body);
        user.profileImage='';
        const salt = await bcryptjs.genSalt();
        // console.log(salt,salt.length)
        const hashPassword = await bcryptjs.hash(body.password,salt);
        // console.log(hashPassword,hashPassword.length);
        user.password=hashPassword;
        // console.log(user.password,user.password.length)
        
        
        if(totalUser==0){
            user.role='admin';
            user.isActive='true'
        }

        if(totalUser>0 && user.role =='admin'){
            return res.status(400).json({error:'admin is already exists'})
        }

        if(totalUser>0 && !user.role){
            return res.status(400).json({error:'role field is required'})
        }

        if(user.role=='buyer'){
            user.isActive='true'
        }

        if(!['admin','seller','buyer'].includes(user.role)){
            return res.status(400).json({error:'Please provide valid role either seller or buyer'})
        }

       await user.save();
       return res.json(user);

    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
};


//***** user login controller
userController.login = async (req,res)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    const {email,password} = req.body;

    try{
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({error:'invalid email or password'})
        }
         const isVerified = bcryptjs.compare(password,user.password);

         if(!isVerified){
            return res.status(404).json({error:'invalid email or password'}) 
         }

         const tokenData = {userId:user._id,role:user.role};

         const token = jwt.sign(tokenData,'Arun@123',{expiresIn:'7d'});
       return res.json({token:token});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
};


//**** account controller
userController.account = async (req,res)=>{
    const userId=req.userId;

    try{
        const userAccount= await User.findById(userId)
   return res.json(userAccount);
    }catch(error){
        console.log(error)
    }
}

userController.list = async(req,res)=>{
    const users = await User.find()
   return res.json(users)
};

//***** delete Account
userController.remove = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }

    const id = req.params.id;
    try{
        if(req.role=='admin' || id==req.userId){
            const user = await User.findByIdAndDelete(id);
            if(!user){
                return res.status(404).json({error:"User not found"})
            }
            return res.json(user)
        }
        return res.status(403).json({error:'you connot delete account user is invalid'});
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
    
};


//****** update activation
userController.activation = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const id =req.params.id;
    const {isActive} =req.body;
    try{
        const user = await User.findByIdAndUpdate(id,{isActive},{new:true});
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        return res.json(user);
    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
}

//update account
userController.update = async(req,res) =>{
    const id = req.params.id;
    const {name,email,password,profileImage} = req.body;
    try{
        
        if(id==req.userId){
            const salt = await bcryptjs.genSalt()
            const hash= await bcryptjs.hash(password,salt)
            const user = await User.findByIdAndUpdate(id,{name,email,password:hash,profileImage},{new:true});
            if(!user){
                return res.status(404).json({error:"User not found"})
            }
            return res.json(user);
        }
        return res.json({error:"cannot update this account user is invalid"})

    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
}


//profile Image Upload
userController.uploadImage = async(req,res) =>{
    const id = req.params.id;
    const {profileImage} = req.body;
    try{
        
        if(id==req.userId){
            
            const user = await User.findByIdAndUpdate(id,{profileImage},{new:true});
            if(!user){
                return res.status(404).json({error:"User not found"})
            }
            return res.json(user);
        }
        return res.json({error:"cannot update this account user is invalid"})

    }catch(error){
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default userController;