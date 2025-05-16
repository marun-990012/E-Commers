import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { viewProduct } from "../slices/productSlice";
import { fetchAccount, addToCart } from "../slices/accountSlice";
import { CircleUser } from "lucide-react";
import { MessageSquareShare } from "lucide-react";
import { SendHorizontal } from "lucide-react";
import { viewProduct, sendEnquiry } from "../slices/productSlice";
import { listCategories } from "../slices/categorySlice";

function ProductDetail() {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  // console.log(id)
  useEffect(() => {
    dispatch(viewProduct(id));
    if (localStorage.getItem("token")) {
      dispatch(fetchAccount());
    }
    dispatch(listCategories());
  }, []);

  const { productDetail } = useSelector((state) => {
    return state.products;
  });

  console.log(productDetail);
  const [imageUrl, setImageUrl] = useState(
    productDetail.images && productDetail.images.length > 0
      ? productDetail.images[0]
      : null
  );

  useEffect(() => {
    if (
      productDetail &&
      productDetail.images &&
      productDetail.images.length > 0
    ) {
      setImageUrl(productDetail.images[0]); // Set the first image as the default
    }
  }, [productDetail]);

  const { data } = useSelector((state) => {
    return state.account;
  });

  const categories = useSelector((state) => {
    return state.categories;
  });

  const category = categories.data.find((ele) => {
    return ele._id == productDetail.category;
  });
  //   console.log(category);
  let enquiries;

  // if (productDetail && productDetail.enquiries && data?._id) {
  //     enquiries = productDetail.enquiries.filter(ele => ele.buyer === data._id);
  // }

  if (productDetail && productDetail.enquiries) {
    enquiries = productDetail.enquiries.map((ele) => ele);
  }

  // console.log(enquiries)
  const handleSendEnquiry = (e) => {
    e.preventDefault();

    if (message.trim().length > 0) {
      if (localStorage.getItem("token")) {
        const formData = {
          name: data.name,
          messages: message,
        };
        const id = productDetail._id;

        dispatch(sendEnquiry({ id, formData }));
        setMessage("");
      } else {
        alert("login to send Message");
      }
    }
  };

  const handleAddToCart = (id) => {
   
    if(data && localStorage.getItem('token')){

      if(data.role =='seller' || data.role=='admin'){
        alert('Admins and sellers cannot add products to the cart')
      }else{

        if (!data?.cart.includes(id)) {
          dispatch(addToCart(id));
        } else {
          alert("already added in cart");
        }
      }
       
    }else{
        alert('Login and add to cart')
    }
    
  };

  const handleChangeImage = (url) => {
    setImageUrl(url);
  };

  // Revert back to the default image on mouse leave
  const handleMouseLeave = () => {
    if (productDetail?.images?.length > 0) {
      setImageUrl(productDetail.images[0]); // Default to the first image
    }
  };

  return (
    <div className="mt-3">
      <div className="flex flex-col justify-center items-center py-10 px-10 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-1">
        <div className="flex">
          {/* for image */}
          <div className="flex flex-col">
            <div className="flex">
              {/* for small image */}
              <div className="mr-3 flex flex-col gap-[10px]  ">
                {/* <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer">
                            <img className=" w-full h-full object-contain rounded-[8px]" src={productDetail.image} alt="" />
                        </div>
                        <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer">
                            <img className=" w-full h-full object-contain rounded-[8px]" src={productDetail.image} alt="" />
                        </div>
                        <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer">
                            <img className=" w-full h-full object-contain rounded-[8px]" src={productDetail.image} alt="" />
                        </div>
                        <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer">
                            <img className=" w-full h-full object-contain rounded-[8px]" src={productDetail.image} alt="" />
                        </div> */}

                {/* {productDetail.images.map((ele) => {
                  return (
                    <div className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer">
                      <img
                        className=" w-full h-full object-contain rounded-[8px]"
                        src={ele}
                        alt=""
                        onClick={()=>{
                            handleChangeImage(ele);
                        }}
                      />
                    </div>
                  );
                })} */}

                {productDetail.images &&
                Array.isArray(productDetail.images) &&
                productDetail.images.length > 0 ? (
                  productDetail.images.map((ele, index) => (
                    <div
                      key={index}
                      className="w-[72px] h-[72px] border border-gray-300 rounded-[8px] shadow p-1 opacity-[60%] hover:opacity-[100%] cursor-pointer"
                    >
                      <img
                        className="w-full h-full object-contain rounded-[8px]"
                        src={ele}
                        alt={`image-${index}`}
                        // onClick={() => {
                        //   handleChangeImage(ele);
                        // }}
                        onMouseEnter={() => handleChangeImage(ele)} // Change image on hover
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>

              {/* for main image */}
              <div className="w-[320px] h-[320px] border border-gray-300 rounded-[8px] shadow p-1">
                <img
                  key={imageUrl}
                  className="w-full h-full object-contain"
                  src={imageUrl}
                  alt=""
                />
              </div>
            </div>

            {/* for enquiry */}
            <div>
              <div className=" mt-8  w-full">
                <h2 className="ml-2 mb-4">See Enquiries Here</h2>
                <div className="border border-gray-300 rounded-[8px] shadow p-3 ml-1 text-left w-[405px] h-[400px] ">
                  <div className="overflow-y-auto h-[300px] w-full">
                    {enquiries && enquiries.length > 0 ? (
                      enquiries.map((ele) => (
                        <div className="mt-3 ml-3 " key={ele._id}>
                          {" "}
                          {/* use a unique key */}
                          <div className="flex items-center">
                            <CircleUser />
                            <span className="ml-2 font-medium">{ele.name}</span>
                          </div>
                          <div className="flex justify-end w-full">
                            <p className=" mr-5 text-left mt-4 rounded-[10px] text-[14px] text-white  bg-[#4f2bdf] px-5 py-2 inline-block">
                              {ele.messages}
                            </p>
                          </div>
                          <div>
                            {ele.response.map((ele) => {
                              return (
                                <p className="ml-2 ml-5 mt-2 text-black rounded-[10px] text-[14px]  bg-gray-200 px-5 py-2 inline-block mr-12">
                                  {ele}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 ml-3">
                        No enquiries from you yet.
                      </p>
                    )}
                  </div>

                  <div className="w-full flex mt-8  ">
                    <div className="flex items-center border border-gray-300 rounded shadow w-[330px] flex h-10">
                      <p className="px-3 bg-[#4f2bdf] h-full flex items-center rounded-tl rounded-bl">
                        <MessageSquareShare color="white" />
                      </p>
                      <form onSubmit={handleSendEnquiry}>
                        <input
                          className="w-[280px] border-none outline-none pl-3 pr-2"
                          type="text"
                          placeholder="Type a message"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        />
                      </form>
                    </div>
                    <p
                      className="ml-4 flex items-center cursor-pointer"
                      onClick={handleSendEnquiry}
                    >
                      <SendHorizontal color="#4f2bdf" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for product detail */}
          <div className="w-150 ml-6">
            <h2 className="font-medium ">{productDetail.name}</h2>
            <p className="border border-gray-300 rounded-[8px] shadow inline-block px-5 bg-green-200 mt-3 mb-4">
              Views - {productDetail.views}
            </p>
            {/* <p className="text-red-500 border-t-1 border-gray-300 pt-2">{productDetail.category}</p> */}
            <p className="text-red-500  border-gray-300 pt-2">
              {category?.name}
            </p>
            <p>
              <span className="text-[30px] text-gray-600">Rs.</span>
              <span className="text-[30px]">{productDetail.price}/-</span>
            </p>
            {/* <p className="ml-2">Views</p> */}

            {/* cart and buy button */}
            <div className="mt-4">
              <button
                className="bg-[#ffa41c] hover:bg-[#d98b18] cursor-pointer text-black px-6 py-[7px] rounded  text-[13px] font-medium"
                onClick={() => {
                  handleAddToCart(productDetail._id);
                }}
              >
                Add to Cart
              </button>
              <button className="bg-[#ffd814] hover:bg-[#d5b40c] cursor-pointer text-black px-6 py-[7px] rounded  text-[13px] font-medium ml-3">
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className="ml-1">Product Details</p>

              <div className=" border border-gray-300 rounded-[8px] shadow p-3 mt-3">
                <p className="text-gray-800 text-[15px]">
                  {productDetail.description}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* div for enquiry */}
      </div>
    </div>
  );
}
export default ProductDetail;
