import mongoose from "mongoose";

const configureDB = async ()=>{
    const url='mongodb://127.0.0.1:27017/classified';
    try{
        mongoose.connect(url);
        console.log('Connected to database')
    }catch(error){
        console.log('Error While Connecting to Database')
    }
}

export default configureDB;