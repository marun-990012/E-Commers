import { fetchAccount ,removeCart} from "../slices/accountSlice";
import { listProducts } from "../slices/productSlice";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Cart(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    useEffect(()=>{
        dispatch(fetchAccount());
        dispatch(listProducts());
    },[]);

    const {data}=useSelector((state)=>{
        return state.account
    });

    // console.log(data.cart);
    

    const products = useSelector((state)=>{
        return state.products
    });

    // console.log(products.data);
    console.log(data.cart)

    // const cart=products.data.filter((product)=>{
    //     if(data.cart?.length>0){
    //         return data.cart.includes(product._id)
    //     }
    // })

    const cart = [...(data.cart || [])]  // <- This avoids crashing if data.cart is undefined
    .reverse()
    .filter(id => id && products.data?.some(p => p._id === id))
    .map(id => products.data?.find(product => product._id === id));


    console.log(cart)
   
    const totalBill=cart.reduce((acc, cv)=>{
        return acc+cv.price;
    },0);
    // console.log(totalBill);

    const handleViewProduct=(id)=>{
        navigate(`/product-detail/${id}`);
    }

    const handleRemoveCart=(id)=>{
        // alert(id);
        dispatch(removeCart(id));
    }

    return (
        <div className="mt-3">
             <div className="flex flex-col  items-center py-1 border-1 border-[#dfdee3] rounded shadow mb-4 mt-1">
                {/* bill div */}
                <div className="  w-full mt-3 flex justify-center mb-3">

                  <div className="border border-green-500 rounded flex w-100 justify-evenly items-center py-2">
                    <div className="flex flex-col items-center">
                        <p className="text-gray-400">Products</p>
                        <p>{cart.length}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-gray-400">Total Bill</p>
                        <p>{totalBill}</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <button className="bg-[#ffd814] hover:bg-[#d5b40c] cursor-pointer text-black px-6 py-[7px] rounded  text-[13px] font-medium ml-3">Buy Now</button>
                    </div>
                  </div>
                </div>

                {/* cart Detail */}
                {cart.map((product)=>{
                    return(
                        <div className="mt-3 mb-3">
                         <div className="border flex items-center justify-evenly w-200 py-3 border border-gray-300 rounded-[8px] shadow">
                    
                        <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1">
                           <img className=" w-full h-full object-contain rounded-[8px]" src={product?.images[0]} alt="" />
                         </div>

                       <div className=" w-70">
                           <p>{product.name.slice(0,34)+'...'}</p>
                       </div>
                       <div className="text-center ">
                             <p className="text-gray-500">Total</p>
                           <p>Rs.{product.price}</p>
                       </div>

                        <div>
                            <button className="bg-[#ffa41c] hover:bg-[#d98b18] cursor-pointer text-white px-3 py-[7px] rounded-[8px]  text-[13px] font-medium" onClick={()=>{handleViewProduct(product._id)}} >View Product</button>
                        </div>

                         <div>
                            <button className="bg-red-500 hover:bg-red-700 cursor-pointer py-[7px] px-4 rounded-[7px] text-[13px] font-medium text-white" onClick={()=>{handleRemoveCart(product._id)}}>Remove</button>
                         </div>
                       </div>
                        </div>
                    )
                })}
                
             </div>
            
        </div>
    )
}
export default Cart;