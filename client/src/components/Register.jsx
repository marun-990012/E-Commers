import { useState } from "react";
import axios from "axios";
function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [role,setRole] = useState('');
    console.log(role)
    const handleSubmit=async(event)=>{
            event.preventDefault()
            const formData={
                name,
                email,
                password,
                role
            }
    
            console.log(formData)
            try{
                const response=await axios.post('http://localhost:3039/register',formData);
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
            // console.log(formData)
    
        }
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="border px-4 py-6 w-80 border-[#c4c4c4] rounded-[8px] shadow">
              <p className="text-center text-[20px]">Register Here!</p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <input  className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] " type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]" type="text" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]" type="text" placeholder="Enter Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <div>
                <label htmlFor="" className="block mt-4 ml-2 mb-1 text-[#aba7a7]">Select user-Type</label>
                <input className="mr-1 ml-1 cursor-pointer" type="radio" id="buyer" name="role" checked={role=='buyer'} onChange={()=>{setRole("buyer")}} /> <label htmlFor="buyer" className="mr-5">Buyer</label>
                <input className="mr-1 cursor-pointer" type="radio" id="seller" name="role" checked={role=='seller'} onChange={()=>{setRole('seller')}}/> <label htmlFor="seller">Seller</label>
                </div>
                <input className='bg-[#4f2bdf] hover:bg-[#34199f] cursor-pointer mt-7 text-white py-[4px] text-[18px] rounded' type="submit" value='Register' />
              </form>
            </div>

        </div>
    )
}
export default Register;