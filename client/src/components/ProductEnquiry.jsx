import { useParams,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { CircleUser,MessageSquareShare,SendHorizontal } from 'lucide-react';
import { useEffect ,useState} from "react";
import { listProducts,sendResponse,assignEditId, deleteProduct } from "../slices/productSlice";
import { listCategories } from "../slices/categorySlice";
import { } from "../slices/productSlice";
function ProductEnquiry(){
    const {id} =useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [message,setMessage] = useState('');
    const { data } = useSelector((state) => state.products);
    // console.log(data)
     useEffect(()=>{
            dispatch(listProducts());
            dispatch(listCategories());
    },[]);

    const product=data.find((ele)=>{
        return ele._id==id;
    });

    const categories =useSelector((state)=>{
      return state.categories;
  });
  
  const category=categories.data.find((ele)=>{
      return ele._id==product.category
  });

  // console.log(category);
    // console.log(product.enquiries)
    const handleSendResponse=(enquiryId)=>{
      // const productId=product._id;
      const replyMessage = message[enquiryId]?.trim();
      if (!replyMessage) return;
      const formData={
        response:replyMessage,
        enquiryId:enquiryId
      }
  // Dispatch or handle your reply logic here
      // console.log(`Replying to ${enquiryId} with message:`, replyMessage);
      dispatch(sendResponse({formData,id}));

  // Clear input after sending
    setMessage(prev => ({ ...prev, [enquiryId]: '' }));
    }

    const handleDelete=(id)=>{
            dispatch(deleteProduct(id));
            navigate('/my-product');
        }
   return (
    <div className="mt-3">
       {product&&(
        <div className="flex justify-center items-center flex-col py-1 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-1">
       
        <div className="flex justify-start w-full mt-6">
          <div className="ml-13">
          <h2 className=" bg-gray-300  w- px-3 py-2 rounded text-black ">Product Enquiry and Details</h2>
          </div>
           
        </div> 
       
       
    <div className="flex flex-wrap md:flex-nowrap justify-center mt-8  w-full">
   {/* Image Section */}
  
  <div>
  <div className=" ml-12 border border-gray-300 p-4 rounded-[8px] h-[400px] shadow">
   <div className="mb-2 ml-4 flex justify-end"> <p className="mr-4 border border-purple-400 shadow inline-block rounded-[10px] px-2 text-[#d900ff] ">{category?.name}</p></div>
     <div className="h-[310px] w-[310px]  flex items-center">
     <img
       src={product.images[0]}
       className="w-full h-full object-contain"
       alt="product"
     />
     </div>
   </div>
  </div>
   
 
   {/* Product Info Section */}
   
   <div className=" ml-5 w-[700px] overflow-x-auto px-3 pr-4">
     <h2 className="text-xl font-semibold">{product.name}</h2>
     {/* <p className="mt-4">Views</p> */}
     <p className="border border-purple-400 shadow inline-block rounded-[10px] px-3 bg-[#d900ff] text-white mt-5">Views: {product.views}</p>

     
     <h1 className="ml-1 text-[30px] mt-4 mb-3">Rs.{product.price}/-</h1>
     <p className="mb-2 font-medium">Product Detail</p>
     <p>{product.description}</p>

     <div className="mt-5">
      <button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{
        dispatch(assignEditId(id));
        navigate(`/product/${id}`);
      }}>Edit Product</button>
      <button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(id)}}>Delete Product</button>
     </div>

     {/* all images */}
     <div className="">
     <div className="flex justify-evenly items-center mt-5 w-100 p-3 rounded-[8px] border border-gray-300 shadow-2xl">
      {product.images.map((ele)=>{
        return(
          <div className="w-[70px] h-[70px] border border-gray-400 rounded-[8px] shadow p-1">
        <img className="w-full h-full object-contains" src={ele} alt="" />
     </div>
        )
      })}
     </div>
     </div>
 
     
   </div>
 
   
 </div>

     <div className="w-full mt-1 mb-10">
      <div className="ml-12">
      <h2 className="mb-4 ml-1 font-medium"> Product Enquiries :-</h2>
      <div className="h-[500px] w-[400px] p-3 overflow-y-auto overflow-x-hidden border border-gray-300 p-4 w-91 rounded-[8px] shadow">
         {product.enquiries.map((ele)=>{
             return <div key={ele._id} className="mt-4">
                 <div className="border border-gray-300 p-4 w-91 rounded-[8px] shadow">
                  <div className="flex items-center">
                    <CircleUser />
                       <span className="ml-2 font-medium text-[15px]">{ele.name}</span>
                   </div>
                 <p className="ml-5 mt-2 text-black rounded-[10px] text-[14px]  bg-gray-200 px-5 py-2 inline-block mr-12">{ele.messages}</p>
                 <div className="text-right">
                 {ele.response.map((ele)=>{
                  return(
                    <div>
                      <p className="mr-10 ml-14 mt-4 rounded-[10px] text-[14px] text-white  bg-[#4f2bdf] px-5 py-2 inline-block ">{ele}</p>
                    </div>
                  )
                 })}
                 </div>

                {/* reply */}
                 <div>
                  <div className="w-full flex mt-2  ">
                        <div className="flex items-center border border-gray-300 rounded shadow w-[330px] flex h-7">
                        {/* <p className="px-3 border-r h-full flex items-center rounded-tl rounded-bl"><MessageSquareShare color="#4f2bdf" size={10}/></p> */}
                        <form onSubmit={(e)=>{
                          e.preventDefault()
                          handleSendResponse(ele._id);
                          }} >
                            <input className="w-[280px] border-none outline-none pl-3 pr-2" type="text" placeholder="Reply. . ."  value={message[ele._id] || ''}
                                 onChange={(e) => {
                                 setMessage({ ...message, [ele._id]: e.target.value });
                             }}/>
                        </form>
                        </div>
                        <p className="ml-4 flex items-center cursor-pointer" onClick={()=>{handleSendResponse(ele._id)}} ><SendHorizontal color="#4f2bdf"/></p>
                      </div>
                 </div>

                </div>
             </div>
         })}
     </div>
     </div>
     </div>
  </div>
       )}
    </div>
   ) 
}
export default ProductEnquiry;