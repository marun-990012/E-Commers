import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { fetchMyProducts ,assignEditId, deleteProduct} from "../slices/productSlice";
// import { assignEditId } from "../slices/productSlice";
import { listCategories } from "../slices/categorySlice";

function MyProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image,setImage] = useState('image');
    console.log(image)
    const [title,setTitle] = useState('title');
    const [price,setPrice] = useState('price');
    const [description,setDescription] =useState('');
    const [category,setCategory] =useState('category');
    const [views,setViews] =useState('views');
    const [status,setStatus] =useState('status');
    const [enquiry,setEnquiry] =useState('enquiry');
    const [action,setAction] =useState('');

    const { data } = useSelector((state) => state.products);

    const categories =useSelector((state)=>{
        return state.categories;
    });
    // console.log(categories.data);
    // console.log(data)
    useEffect(() => {
        dispatch(fetchMyProducts());
        dispatch(listCategories());
    }, []);

    // const handleView=(id)=>{
    //     console.log(id)
 // }
    const handleDelete=(id)=>{
        dispatch(deleteProduct(id))
    }

    const products = data.map(product => {
        const category = categories.data.find(cat => cat._id === product.category);
        return {
          ...product,
          category: category ? category.name : 'Unknown'
        };
      });

    //   console.log(productsWithCategoryNames)
    return (
        <div className="mt-3 w-[100%]">
            
            <div className="flex flex-col w-[100%] justify-center items-center  border border-[#dfdee3] rounded  mb-4 mt-1">
            

            <div className="flex justify-start w-full mt-6  ">
                
                <div className="flex justify-start w-155 border border-gray-300 rounded-[8px] shadow px-10 py-4 ml-7">

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="image">Image</label><input id="image" type="checkbox" className="cursor-pointer" checked={image=='image'} onChange={() => setImage(image === 'image' ? '' : 'image')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Title">Title</label><input id="Title" type="checkbox" className="cursor-pointer" checked={title=='title'} onChange={() => setTitle(title === 'title' ? '' : 'title')} />
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Price">Price</label><input id="Price" type="checkbox" className="cursor-pointer" checked={price=='price'} onChange={() => setPrice(price === 'price' ? '' : 'price')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Description">Description</label><input id="Description" type="checkbox" className="cursor-pointer" checked={description=='description'} onChange={() => setDescription(description === 'description' ? '' : 'description')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Category">Category</label><input id="Category" type="checkbox" className="cursor-pointer" checked={category=='category'} onChange={() => setCategory(category === 'category' ? '' : 'category')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Views">Views</label><input id="Views" type="checkbox" className="cursor-pointer" checked={views=='views'} onChange={() => setViews(views === 'views' ? '' : 'views')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Status">Status</label><input id="Status" type="checkbox" className="cursor-pointer" checked={status=='status'} onChange={() => setStatus(status === 'status' ? '' : 'status')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Enquiry">Enquiry</label><input id="Enquiry" type="checkbox" className="cursor-pointer" checked={enquiry=='enquiry'} onChange={() => setEnquiry(enquiry === 'enquiry' ? '' : 'enquiry')}/>
                </div>

                <div className="flex flex-col mr-3">
                <label className="mb-2 text-[#a2a3a8]" htmlFor="Actions">Actions</label><input id="Actions" type="checkbox" className="cursor-pointer" checked={action=='action'} onChange={() => setAction(action === 'action' ? '' : 'action')}/>
                </div>

                </div>
            </div>

                {/* <div className="flex justify-start w-full mt-6 ml-20">
                    <h2 className="bg-blue-600 w-30 px-3 rounded text-white">My Products</h2>
                </div> */}

                {/* 🔥 THIS IS THE FIX */}
                <div className="w-full py-10 px-6 rounded overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="text-center">
                                {image=='image' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Product image</th>)}
                                {title=='title' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Product Name</th>)}
                                {price=="price" && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Product Price</th>)}
                                {description=='description' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Description</th>)}
                                {category=='category' && ( <th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Category</th>)}
                                {views=='views' && ( <th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Total Views</th>)}
                                {status=='status' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Product Status</th>)}
                                {enquiry=='enquiry' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Enquiries</th>)}
                                {action=='action' && (<th className="border-b border-[#dfdee3] px-4 py-2 text-[#a2a3a8] text-[14px] whitespace-nowrap align-middle">Actions</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((ele) => {
                             return <tr key={ele._id}>
                                    {image=='image' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">
                                        <div className="w-[70px] h-[70px] border border-gray-400 rounded-[8px] shadow p-1">
                                            <img className="w-full h-full object-contains" src={ele.images[0]} alt="" />
                                        </div>
                                    </td>)}
                                    {title=='title' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">{ele.name}</td>)}
                                    {price=="price" && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]"><span className="font-medium">Rs.</span>{ele.price}/-</td>)}
                                    {description=='description' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">{ele.description}</td>)}
                                    {category=='category' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">{ele.category}</td>)}
                                    {views=='views' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">{ele.views}</td>)}
                                    {status=='status' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px] text-green-500 font-medium">{ele.isApproved ? 'Approved' : 'Not Approved'}</td>)}
                                    {enquiry=='enquiry' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">
                                    <Link to={`/product-enquiry/${ele._id}`}>
                                    <button className="bg-orange-500 hover:bg-orange-700 rounded text-white py-1 px-2 text-[12px] font-medium cursor-pointer">
                                        View Enquiry
                                    </button>
                                    </Link>
                                    </td>)}
                                    
                                    {action=='action' && (<td className="border-b border-[#dfdee3] py-2 text-center text-[14px]">
                                        <div className="flex justify-center">
                                        <button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{
                                           dispatch(assignEditId(ele._id));
                                           navigate(`/product/${ele._id}`);
                                           }}>edit</button>
                                        
                                         <button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button>
                                        </div>
                                    </td>)}
                                    
                                </tr>
                             })}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-start w-full mt-6">
                    <div className="ml-5">
                    <button
                        className="mt-5 mb-5 text-center bg-green-600 text-white px-6 py-1 rounded-[6px] hover:bg-green-800 cursor-pointer"
                        onClick={() => {
                            navigate('/product');
                        }}
                    >
                        Add Product
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProducts;
