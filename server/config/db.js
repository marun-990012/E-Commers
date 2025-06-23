import mongoose from "mongoose";

const configureDB = async ()=>{
    const url='mongodb+srv://arunlamani89:Marun2000@cluster1.moaqxug.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster1';
    try{
        mongoose.connect(url);
        console.log('Connected to database')
    }catch(error){
        console.log('Error While Connecting to Database')
    }
}

export default configureDB;