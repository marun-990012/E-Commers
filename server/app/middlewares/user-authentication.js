import jwt from 'jsonwebtoken';

export async function authenticateUser (req,res,next){

    const token = req.headers['authorization'];
    // console.log(token)
    if(!token){
       return res.status(401).json({error:'Token is required'})
    }
    try{
        const tokenData = jwt.verify(token,'Arun@123');
        req.userId = tokenData.userId;
        req.role = tokenData.role;
        // console.log(tokenData.userId)
        next()
    }catch(error){
        // console.log(error)
        return res.status(401).json(error.message);
    }
}