import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../slices/productSlice";
import { addToCart } from "../slices/accountSlice";
function Home(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        dispatch(listProducts());
    },[dispatch]);
    const {data} = useSelector((state)=>{
        return state.products
    });

    // console.log(data)

    const products=data.filter((ele)=>{
        return ele.isApproved==true && ele.rejected==false;
    });

    console.log(products)

    const handleViewProduct=(id)=>{
        navigate(`/product-detail/${id}`);
    }

    const account =useSelector((state)=>{
        return state.account;
    });
   

        // const handleAddToCart = (id) => {
        //     if(account.data && localStorage.getItem('token')){
        //         if (!account.data?.cart.includes(id)) {
        //             dispatch(addToCart(id));
        //           } else {
        //             alert("already added in cart");
        //           }
        //     }else{
        //         alert('Login and add to cart')
        //     }
            
        //   };



        const handleAddToCart = (id) => {
   
            if(account.data && localStorage.getItem('token')){
        
              if(account.data.role =='seller' || account.data.role=='admin'){
                alert('Admins and sellers cannot add products to the cart')
              }else{
        
                if (!account.data?.cart.includes(id)) {
                  dispatch(addToCart(id));
                } else {
                  alert("already added in cart");
                }
              }
               
            }else{
                alert('Login and add to cart')
            }
            
          };
   
    return(
        <div className="mt-3">
             <div className="flex flex-col justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow mb-4 mt-1">
             

             <div className="flex flex-wrap justify-evenly mb-4">
             {products.map((ele)=>{
                return (
                 <div className="border border-gray-300 rounded-[8px] shadow w-60 mt-8 transition-transform duration-300 ease-in-out transform hover:scale-103 " >
                        <div className="flex flex-col justify-between h-[330px]">
                         <div>
                         <img className="w-full h-[200px] object-cover rounded-tr-[8px] rounded-tl-[8px] cursor-pointer" src={ele.images[0]} alt="" onClick={()=>{handleViewProduct(ele._id)}}/>
                         </div>

                        <div className="border-t-1 w-60 p-3 rounded-br-[8px] rounded-bl-[8px] ">
                          <h2 className="cursor-pointer hover:underline" onClick={()=>{handleViewProduct(ele._id)}}>
                            {/* {ele.name} */}
                          {ele.name.slice(0, 25)+ "..."}
                          </h2>
                          <p className="cursor-pointer text-[25px] inline-block rounded w-20" onClick={()=>{handleViewProduct(ele._id)}}>Rs.{ele.price}</p>
                          <div className=" flex justify-between mt-4 mb-4">
                            <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-2 py-[2px] rounded border text-[13px]" onClick={()=>{handleAddToCart(ele._id)}}>Add to Cart</button>
                            <button className="bg-white px-2 py-[2px] rounded text-[13px] text-[#07af65] hover:text-[#086b3f] cursor-pointer" onClick={()=>{handleViewProduct(ele._id)}}>View Details</button>
                          </div>
                        </div>
                        </div> 
                    </div>
                )
             })}
             </div>
             </div>
            

        </div>
    )
}
export default Home;