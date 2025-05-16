import express from 'express';
import {checkSchema} from 'express-validator';
import cors from 'cors'
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

import configureDB from './config/db.js';

//for accounts
import userController from './app/controllers/user-controller.js';
import { userRegisterValidationSchema,userLoginValidationSchema } from './app/validators/user-validation-schema.js';
import { authenticateUser } from './app/middlewares/user-authentication.js';
import { userUathorize } from './app/middlewares/user-authorize.js';
import { idValidationSchema } from './app/validators/id-validation-schema.js';

//for Cactegory
import categoryController from './app/controllers/category-controller.js';
import {categoryValidationSchema} from './app/validators/category-name-validation-schema.js';

//for Products
import productController from './app/controllers/product-controller.js';

//for image 
import imageController from './app/controllers/image-controller.js';
const app = express();
const port = 3039;

app.use(cors())
app.use(express.json())

configureDB();

cloudinary.config({ 
    cloud_name: 'dxludspye', 
    api_key: '594237119177773', 
    api_secret: 'TiogsJ8kmhz5Fm48y609f3m8Rrc' // Click 'View API Keys' above to copy your API secret
});

const storage=multer.diskStorage({
    // destination:(req,file,cb)=>{
    //     return cb(null,'./public/images');
    // },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage});

// app.post('/upload',upload.single('file'),async(req,res)=>{
//     // console.log(req.body)
//     // console.log(req.file.path)
//     const file=req.file.path;

//     const cloudinaryResponse= await cloudinary.uploader.upload(file,{
//         folder:'classified_App_images'
//     });

//     // console.log("cloudinary-res",cloudinaryResponse)
//     res.json(cloudinaryResponse)
// })

// product image upload

app.post('/upload', upload.single('file'), async(req,res)=>{
    try {
          const file = req.file.path;
      
          const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: 'classified_App_images',
          });
      
          return  res.json(cloudinaryResponse);
        } catch (err) {
          console.error("Error uploading image to Cloudinary:", err);
          return  res.status(500).json({ error: "Failed to upload image" });
        }
});


//for account
app.post('/register',checkSchema(userRegisterValidationSchema),userController.register);
app.post('/login',checkSchema(userLoginValidationSchema),userController.login);
app.get('/account', authenticateUser,userUathorize(['admin','seller','buyer']),userController.account);
app.delete('/remove/:id',authenticateUser,checkSchema(idValidationSchema),userController.remove)
app.put('/activation/:id',authenticateUser,userUathorize(['admin']),checkSchema(idValidationSchema),userController.activation);
app.put('/update-account/:id',authenticateUser,checkSchema(idValidationSchema),userController.update)
app.get('/users',authenticateUser,userUathorize(['admin']),userController.list);
app.put('/upload-image/:id',authenticateUser,userController.uploadImage);

//for category
app.get('/category',categoryController.list);
app.post('/category',authenticateUser,userUathorize(['admin']),checkSchema(categoryValidationSchema),categoryController.create);
app.get('/category/:id',authenticateUser,userUathorize(['admin']),checkSchema(idValidationSchema),categoryController.show)
app.delete('/category/:id',authenticateUser,userUathorize(['admin']),checkSchema(idValidationSchema),categoryController.remove);
app.put('/category/:id',authenticateUser,userUathorize(['admin']),checkSchema(idValidationSchema),categoryController.update);

//for Products
app.get('/product',productController.list);
app.post('/product',authenticateUser,userUathorize(['seller']),productController.create);
app.put('/product/:id',authenticateUser,userUathorize(['seller']),checkSchema(idValidationSchema),productController.update);
app.delete('/product/:id',authenticateUser,userUathorize(['seller']),checkSchema(idValidationSchema),productController.remove);
app.put('/productapprove/:id',authenticateUser,userUathorize(['admin']),checkSchema(idValidationSchema),productController.approve);
app.get('/productmy',authenticateUser,productController.show);
app.post('/enquiry/:id',authenticateUser,userUathorize(['buyer']),checkSchema(idValidationSchema),productController.addEnquiry);
app.put('/remove-enquiry/:id/:enid',authenticateUser,userUathorize(['buyer']),checkSchema(idValidationSchema),productController.removeEnquiry)
app.post('/response/:id',authenticateUser,userUathorize(['seller']),checkSchema(idValidationSchema),productController.responseToEnquiry)

//for product view and increase views
app.get('/product/:id',productController.showProduct);

//interested Buyer 
app.post('/interested-buyer/:id',authenticateUser,userUathorize(['buyer']),productController.interestedBuyer);
app.delete('/remove-interested-buyer/:id',authenticateUser,userUathorize(['buyer']),productController.removeInterestedBuyer);

// cart
app.post('/cart/:id',authenticateUser,userUathorize(['buyer']),productController.addToCart)
app.post('/remove-cart/:id',authenticateUser,userUathorize(['buyer']),productController.removeCart)



app.listen(port,()=>{
    console.log('Server is running on port ',port);
})