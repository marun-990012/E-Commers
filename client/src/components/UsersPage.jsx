import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
// import { listUsers } from "../slices/userSlice";
import { listUsers,activeUser } from "../slices/userSlice";

function UsersPage(){
    const [activation,setActivation]=useState('activated');
    const dispatch=useDispatch();
    // console.log(product)
    const {data}=useSelector((state)=>{
        return state.users;
    });

    useEffect(()=>{
        dispatch(listUsers());
    },[dispatch]);

    // console.log(data);
    
    const ActivatedUsers=data.filter((ele)=>{
        return ele.isActive==true;
    });

    // console.log(approvedProducts)

    const requestedUsers=data.filter((ele)=>{
        return ele.isActive==false;
    });

    // console.log(requestedProduct);
    const handleActive=(id)=>{
        dispatch(activeUser(id));
    }

    return (
        <div className="mt-3 mr-2">
            <div className="bg-gray-300 w-90 flex justify-between items-center py-2 px-2 rounded">
                <button className={activation=='activated'?"bg-[#4f2bdf] py-1 px-6 text-white rounded cursor-pointer":"bg-white py-1 px-6 text-black rounded cursor-pointer"} onClick={()=>{
                    setActivation('activated');
                }}>Activate Users</button>

                <button className={activation=='requested'?"bg-[#4f2bdf] py-1 px-6 text-white rounded cursor-pointer":"bg-white py-1 px-6 text-black rounded cursor-pointer"} onClick={()=>{
                    setActivation('requested');
                }}>Requested Users</button>

                
            </div>
            
        <div className="flex justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-1">
            
            <div className=" w-250 py-10 px-6 rounded">
                
                {/* Requested Product */}
                {activation=='activated' && (
                    <div>
                        <table className="w-[100%]">
                    <thead>
                        <tr className="text-center">
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Name</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Email</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Role</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Status</th>
                        {/* <th className="border-b border-[#dfdee3] px-20 py-2 text-center text-[#a2a3a8]">seller</th> */}
                        
                        </tr>  
                    </thead>
                    <tbody>
                        {ActivatedUsers.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center ">image</td> */}
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.name}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.email}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.role}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center text-green-600 font-medium">{ele.isActive?"Active":""}</td>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    </div>
                )}

                {/* Requested Product */}
                {activation=='requested' && (
                    <div>
                        <table className="w-[100%]">
                    <thead>
                        <tr className="text-center">
                        {/* <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">image</th> */}
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Name</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Email</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Role</th>
                        {/* <th className="border-b border-[#dfdee3] px-20 py-2 text-center text-[#a2a3a8]">seller</th> */}
                        <th className="border-b border-[#dfdee3] px-20 py-2 text-center text-[#a2a3a8]">Activation</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {requestedUsers.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center ">image</td> */}
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.name}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.email}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.role}</td>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.i}</td> */}
                                    <td className="border-b border-[#dfdee3]  py-2 text-center "><div className=" flex justify-evenly items-center"><button className="bg-green-500 hover:bg-green-800 py-1 px-4 rounded-[6px] text-white cursor-pointer" onClick={()=>{
                                        handleActive(ele._id);
                                    }}>Active</button></div></td>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                    </div>
                )}

            
            </div>
        </div>
        </div>
    )
}
export default UsersPage;