import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listCategories } from "../slices/categorySlice";
import { fetchAccount } from "../slices/accountSlice";
import { createProduct, updateProduct } from "../slices/productSlice";
import { fetchMyProducts ,uploadImage} from "../slices/productSlice";
import axios from "axios";
// import { set } from "mongoose";
// import { fetchMyProducts } from "../slices/productSlice";
function ProductForm() {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState("");
//   const [file,setFile] = useState('');
// //   const [image2, setImage2] = useState("");
// //   const [image3, setImage3] = useState("");
// //   const [image4, setImage4] = useState("");
//   const [category, setCategory] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   // console.log(id);

//   useEffect(() => {
//     dispatch(listCategories());
//   }, []);

//   useEffect(() => {
//     dispatch(fetchMyProducts());
//   }, []);

//   useEffect(() => {
//     dispatch(fetchAccount());
//   }, []);

//   const { data } = useSelector((state) => {
//     return state.categories;
//   });

//   // console.log(data)

//   const user = useSelector((state) => {
//     return state.account;
//   });

//   const listProducts = useSelector((state) => {
//     return state.products;
//   });

//   // console.log(listProducts)
//   useEffect(() => {
//     if (id && listProducts.data.length > 0) {
//       const product = listProducts.data.find((ele) => ele._id === id);
//       console.log(product);
//       if (product) {
//         setName(product.name);
//         setCategory(product.category);
//         setPrice(product.price);
//         setDescription(product.description);
//         setImage(product.image);
//       }
//     }
//   }, [id, listProducts.data]);

//   // console.log(listProducts)

//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);
//     // formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // set in Cloudinary
  
//     try {
//       const res = await axios.post(
//         'http://localhost:3039/upload',
//         formData
//       );
//       setImages((prev) => [...prev, res.data.secure_url]); // Save URL
//       console.log('Uploaded Image:', res.data.secure_url);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (id) {
//       const product = listProducts.data.find((ele) => ele._id === id);
//       const formData = {
//         ...product,
//         name,
//         price,
//         image,
//         description,
//         category,
//       };
//       const result = await dispatch(updateProduct({ id, formData }));

//       if (updateProduct.fulfilled.match(result)) {
//         await dispatch(fetchMyProducts()); // 🔄 update data before navigating
//         navigate("/my-product"); // ✅ navigate after fresh data is in Redux
//       } else {
//         console.error("Failed to create category");
//       }
//     } else {
//       const formData = {
//         name,
//         price,
//         images: [],
//         description,
//         category,
//         seller: user.data._id,
//       };

//       // console.log(formData)
//       const result = await dispatch(createProduct(formData));

//       if (createProduct.fulfilled.match(result)) {
//         await dispatch(fetchMyProducts()); // 🔄 update data before navigating
//         navigate("/my-product"); // ✅ navigate after fresh data is in Redux
//       } else {
//         console.error("Failed to create category");
//       }
//     }
//   };
//   return (
//     <div className="mt-3">
//       <div className="flex flex-col justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-1">
//         <div className="flex justify-start w-full mt-6 ml-2">
//           <h2 className=" bg-blue-600 w-45 px-3 rounded text-white ">
//             Create New Products
//           </h2>
//         </div>

//         <div className="mt-10 border border-gray-400 rounded-[8px] shadow py-10 px-8 mb-10 w-90">
//           {/* <h2>Product Form Component</h2> */}
//           <form className="flex flex-col" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Enter Product Name"
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//               }}
//               className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[100%]"
//             />
//             <input
//               type="number"
//               placeholder="Enter Product Price"
//               value={price}
//               onChange={(e) => {
//                 setPrice(e.target.value);
//               }}
//               className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[100%]"
//             />
//             {/* <input type="text" placeholder="Enter Product Description" value={description} onChange={(e)=>{setDescription(e.target.value)}} className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[100%]"/> */}

//             <textarea
//               name=""
//               id=""
//               placeholder="Enter Product Description"
//               value={description}
//               onChange={(e) => {
//                 setDescription(e.target.value);
//               }}
//               className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[100%]"
//             />

//             <label className="text-[#aba7a7] mt-3" htmlFor="">Select Images</label>
//             {/* 1st Image */}
//             <div className="flex">
//               <input
//                 type="file"
//                 placeholder="Enter Product image"
//                  onChange={(e)=>{setFile(e.target.files[0])}}
//                 className="border border-[#c4c4c4] rounded shadow mt-1 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[80%] "
//               />
//               <button className="border border-[#c4c4c4] rounded shadow mt-3 ml-[7px] px-2 py-[3px]" onClick={()=>{handleImageUpload()}}>
//                 Upload
//               </button>
//             </div>

//             {/* 2nd Image */}
//             <div className="flex">
//               <input
//                 type="file"
//                 placeholder="Enter Product image"
//                 onChange={(e)=>{setFile(e.target.files[0])}}
//                 className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[80%] "
//               />
//               <button className="border border-[#c4c4c4] rounded shadow mt-3 ml-[7px] px-2 py-[3px]">
//                 Upload
//               </button>
//             </div>

//             {/* 3rd Image */}
//             <div className="flex">
//               <input
//                 type="file"
//                 placeholder="Enter Product image"
//                 onChange={(e)=>{setFile(e.target.files[0])}}
//                 className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[80%] "
//               />
//               <button className="border border-[#c4c4c4] rounded shadow mt-3 ml-[7px] px-2 py-[3px]">
//                 Upload
//               </button>
//             </div>

//             {/* 4th Image */}
//             <div className="flex">
//               <input
//                 type="file"
//                 placeholder="Enter Product image"
//                 onChange={(e)=>{setFile(e.target.files[0])}}
//                 className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[80%] "
//               />
//               <button className="border border-[#c4c4c4] rounded shadow mt-3 ml-[7px] px-2 py-[3px]">
//                 Upload
//               </button>
//             </div>

//             <select
//               className="border border-[#c4c4c4] rounded text-[#aba7a7] shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none"
//               value={category}
//               onChange={(e) => {
//                 setCategory(e.target.value);
//               }}
//             >
//               <option className="text-[#aba7a7]" value="">
//                 Select Category
//               </option>
//               {data.map((ele) => {
//                 return (
//                   <option key={ele._id} value={ele._id}>
//                     {ele.name}
//                   </option>
//                 );
//               })}
//             </select>

//             <div className="mt-5 text-center bg-green-600 text-white px-6 py-1 rounded-[6px] hover:bg-green-800 cursor-pointer">
//               <button
//                 className="cursor-pointer"
//                onClick={handleSubmit}

//               >Add Product</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );

const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);
  const [files, setFiles] = useState(["", "", "", ""]);
  const [category, setCategory] = useState("");
  const [imageSpinner,setImageSpinner] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listCategories());
    dispatch(fetchMyProducts());
    dispatch(fetchAccount());
  }, []);

  const { data: categories } = useSelector((state) => state.categories);
  const { data: user } = useSelector((state) => state.account);
  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    if (id && products.length > 0) {
      const product = products.find((ele) => ele._id === id);
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price);
        setDescription(product.description);
        setImages(product.images || ["", "", "", ""]);
      }
    }
  }, [id, products]);

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const handleImageUpload = async (index) => {
    const file = files[index];
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3039/upload", formData);
      const url = res.data.secure_url;
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      price,
      images,
      description,
      category,
      seller: user._id,
    };

    if (id) {
      const result = await dispatch(updateProduct({ id, formData }));
      if (updateProduct.fulfilled.match(result)) {
        await dispatch(fetchMyProducts());
        navigate("/my-product");
      } else {
        console.error("Failed to update product");
      }
    } else {
      const result = await dispatch(createProduct(formData));
      if (createProduct.fulfilled.match(result)) {
        await dispatch(fetchMyProducts());
        navigate("/my-product");
      } else {
        console.error("Failed to create product");
      }
    }
  };

  return (
    <div className="mt-3">

{/* <div className="flex justify-start w-full mt-6">
          <div className="ml-13">
          <h2 className=" bg-gray-300  w- px-3 py-2 rounded text-black ">Product Enquiry and Details</h2>
          </div>
           
        </div>  */}

      <div className="flex flex-col justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow-2xl mb-4 mt-1">
        <div className="flex justify-start w-full mt-6">
        <div className="ml-13">
          <h2 className="bg-gray-300  w- px-3 py-2 rounded text-black">
            {id ? "Edit Product" : "Create New Product"}
          </h2>
          </div>
        </div>

        <div className="mt- border border-gray-400 rounded-[8px] shadow py-8 px-8 mb-10 w-100">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]  "
            />

            <input
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]  "
            />

            <textarea
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]  "
            />

            <label className="mt-4 text-gray-600">Select Images</label>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[80%] cursor-pointer "
                />
                <button
                  type="button"
                  onClick={() => handleImageUpload(index)}
                  className="border border-[#c4c4c4] rounded shadow mt-3 ml-[7px] px-2 py-[3px] cursor-pointer"
                >
                  Upload
                </button>
                {images[index] && (
                  <span className="ml-2 text-green-600 text-sm">✅</span>
                )}
              </div>
            ))}

            <select
             className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7]  "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((ele) => (
                <option key={ele._id} value={ele._id}>
                  {ele.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800 cursor-pointer"
            >
              {id ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ProductForm;
