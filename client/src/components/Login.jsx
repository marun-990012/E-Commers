import { useState } from "react";
// import axios from 'axios'
import { useDispatch } from "react-redux";
import { login } from "../slices/accountSlice";
import { useNavigate } from "react-router-dom";
function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate()

    const handleSubmit=async(event)=>{
        event.preventDefault()
        const formData={
            email,
            password
        }

      const result= await dispatch(login(formData));
        console.log(result);
        console.log(login.fulfilled.match(result))
        if(login.fulfilled.match(result)){
            navigate('/profile');
        }

    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="border px-4 py-6 pb-9 w-80 border-[#c4c4c4] rounded-[8px] shadow">
              <p className="text-center text-[20px]">Login Here!</p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
               
                <input className="border border-[#c4c4c4] rounded shadow mt-4 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]" type="text" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className="border border-[#c4c4c4] rounded shadow mt-4 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]" type="text" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                
                <input className='bg-[#4f2bdf] hover:bg-[#34199f] cursor-pointer mt-6 text-white py-[4px] text-[18px] rounded' type="submit" value='Login' />
              </form>
            </div>

        </div>
    )
}
export default Login;