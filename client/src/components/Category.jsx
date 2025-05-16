import { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { listCategories ,deleteCategory} from "../slices/categorySlice";
// import { assignEditId } from "../slices/categorySlice";
function Category(){
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {data,serverError,editId}=useSelector((state)=>{
        return state.categories;
    });

    console.log(data)

    useEffect(()=>{
        dispatch(listCategories());

    },[dispatch]);

    // console.log(data)


    const handleDelete=(id)=>{
        // console.log(id)
        dispatch(deleteCategory(id))
    }

    return(
        <div className="flex justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-3">
            <div className=" w-250 py-5 px- rounded">
            <div className="flex justify-start w-full mt-">
          <div className="ml-">
          <h2 className=" bg-gray-300  w- px-3 py-2 rounded text-black ">Category Details</h2>
          </div>
           
        </div> 
                <table className="w-[100%] mt-3">
                    <thead>
                        <tr className="text-center">
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Category Name</th>
                        <th className="border-b border-[#dfdee3] px-20 py-2 text-center text-[#a2a3a8]">Actions</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {data.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.name}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center">
                                       
                                           <button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-[2px] rounded-[6px] cursor-pointer" onClick={()=>{
                                        //    dispatch(assignEditId(ele._id));
                                           navigate(`/category/${ele._id}`);
                                           }}>edit</button>
                                        
                                         <button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-[2px] rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className="mt-5">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-[6px] hover:bg-green-800 cursor-pointer" onClick={()=>{navigate('/category')}}>Add Category</button>
                </div>
            </div>
        </div>
    )
}
export default Category;