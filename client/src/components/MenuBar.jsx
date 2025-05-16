// import { Link } from "react-router-dom";
import { ShoppingBasket ,Search } from 'lucide-react';
import { useNavigate, useLocation ,Link} from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { fetchAccount} from "../slices/accountSlice";
import { useEffect } from 'react';
// import cartImage from '../images/cart.png';
import logo from '../images/logo (2).png'
function MenuBar(){
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location = useLocation();
  // console.log(location.pathname.slice(1))

  const {data,isLoggedIn}=useSelector((state)=>{
    return state.account
  });
      useEffect(()=>{
        
          dispatch(fetchAccount());
        
          
          // dispatch(listProducts());
      },[dispatch]);

          

  console.log(data)

  return(
        <div className="bg-[#101828] top-0 fixed w-[100%] py-2 rounded z-50 h-[40px]">
        <div className="flex justify-between items-center ml-4 mr-8">
          <div className="text-white flex items-center justify-center">
            {/* <img className='w-[60px] p-1 bg-gray-600 rounded-full mb-3' src={logo} alt="" /> */}
            <p className='mb-10'>Online Shopiing</p>
          </div>

          {/* <div className='mb-10 flex'>
            <div className=' border-t border-b border-l w-100 border-white rounded-tl-[5px] rounded-bl-[5px] '>
            <form action="">
              <input className='w-full outline-none text-white px-2' type="text" placeholder='Search Product...' />
            </form>
            </div>
            <div className='bg-[#3a0e7c]  border-[#3a0e7c] py-[1px]'>
            <span className=''>search</span>
            </div>
            
            
            
          </div> */}

{localStorage.getItem('token') && (data?.role !== 'admin' && data?.role !== 'seller')? <div className='mb-10 flex'>
  {/* Input container */}
  <div className='border border-[#5814be] rounded-tl-[5px] rounded-bl-[5px] w-100'>
    <form action="">
      <input
        className='w-full outline-none text-white px-2 bg-transparent'
        type="text"
        placeholder='Search Product...'
      />
    </form>
  </div>

  {/* Search button container */}
  <div className='border border-[#7200ff] bg-[#2a095c] text-white px-3 flex items-center justify-center rounded-tr-[5px] rounded-br-[5px] cursor-pointer'>
    <span><Search size={20} color='#7200ff' /></span>
  </div>
</div>:null}



          <div className= {localStorage.getItem('token')?"text-white flex mt-[1px] mb-9 ":"text-white flex mb "}>
            

           {localStorage.getItem('token') && (data?.role !== 'admin' && data?.role !== 'seller') ? (
            <button  onClick={() => navigate('/view-cart')} className="relative flex cursor-pointer">
            <ShoppingBasket className="text-[19px] bg-gray-600 p-[4px] rounded text-white" size={27}/>
             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full mt-">
               {location.pathname.slice(1)=='view-cart'?'':`${data?.cart?.length}`}
               {/* {location.pathname.slice(1) === 'view-cart' ? '' : (data && data.cart ? data.cart.length : '')} */}

               {/* {data.cart?.length} */}
             </span>
            </button>
           ):null}

{!localStorage.getItem('token') && (
  <div>
    <Link to='/'>Home</Link>
    <button className="text-white bg-[#4f2bdf] py-[2px] px-3 rounded cursor-pointer mb-9 ml-3" onClick={()=>{navigate('/login')}}>Login</button>
    <button className="text-white bg-[#4f2bdf] py-[2px] px-3 rounded ml-3 cursor-pointer" onClick={()=>{navigate('/register')}}>Register</button>
  </div>
)}
            
          </div>
        </div>
        </div>
      //   <ul className="mr-10">
      //   <li className="text-right">
          
      //     <button className="text-white" onClick={()=>{navigate('/view-cart')}}><ShoppingBasket/></button>
      //     <Link className="text-white bg-[#4f2bdf] py-[2px] px-3 rounded" to='/login'>Login</Link> |
      //     <Link className="text-white bg-[#4f2bdf] py-[2px] px-3 rounded" to='/register'>Register</Link>
      //   </li>
      // </ul>
    )
}
export default MenuBar;