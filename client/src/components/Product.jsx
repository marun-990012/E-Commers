import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../slices/productSlice";
import { Check } from "lucide-react";
import { approveProduct, rejectProduct } from "../slices/productSlice";
import { listCategories } from "../slices/categorySlice";
import { listUsers } from "../slices/userSlice";

function Products() {
  const [product, setProduct] = useState("approved");
  const dispatch = useDispatch();

  // console.log(product)
  const users = useSelector((state) => {
    return state.users;
  });
  console.log(users.data);
  const { data } = useSelector((state) => {
    return state.products;
  });

  const categories = useSelector((state) => {
    return state.categories;
  });

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listCategories());
    dispatch(listUsers());
  }, []);

  // console.log(data);
  const products = data.map((product) => {
    const category = categories.data.find(
      (cat) => cat._id === product.category
    );
    const user = users.data.find((user) => {
      return user._id === product.seller;
    });
    return {
      ...product,
      category: category ? category.name : "Unknown",
      seller: user ? user.name : "Unknown",
    };
  });

  const approvedProducts = products.filter((ele) => {
    return ele.isApproved == true;
  });

  console.log(approvedProducts);

  const requestedProduct = products.filter((ele) => {
    return ele.isApproved == false && ele.rejected == false;
  });

  // console.log(requestedProduct);
  const rejectedProduct = products.filter((ele) => {
    return ele.rejected == true;
  });

  //   console.log(products)
  const handleApprove = (id) => {
    const formData = { isApproved: true };
    dispatch(approveProduct(id));
  };

  const handleReject = (id) => {
    dispatch(rejectProduct(id));
  };
  // console.log(rejected)
  return (
    <div className="mt-3">
      <div className="bg-gray-300 w-150 flex justify-between items-center py-2 px-2 rounded">
        <button
          className={
            product == "approved"
              ? "bg-[#4f2bdf] py-1 px-6 text-white rounded cursor-pointer"
              : "bg-white py-1 px-6 text-black rounded cursor-pointer"
          }
          onClick={() => {
            setProduct("approved");
          }}
        >
          Approved Products
        </button>
        <button
          className={
            product == "requested"
              ? "bg-[#4f2bdf] py-1 px-6 text-white rounded cursor-pointer"
              : "bg-white py-1 px-6 text-black rounded cursor-pointer"
          }
          onClick={() => {
            setProduct("requested");
          }}
        >
          Requested Products
        </button>
        <button
          className={
            product == "rejected"
              ? "bg-[#4f2bdf] py-1 px-6 text-white rounded cursor-pointer"
              : "bg-white py-1 px-6 text-black rounded cursor-pointer"
          }
          onClick={() => {
            setProduct("rejected");
          }}
        >
          Rejected Products
        </button>
      </div>

      <div className="flex justify-center items-center py-1 border-1 border-[#dfdee3] rounded shadow-2xl shadow-[10px] mb-4 mt-1">
        <div className=" w-250 py-10 px-6 rounded ">
          {/* Requested Product */}
          {product == "approved" && (
            <div>
              <table className="w-[100%]">
                <thead>
                  <tr className="text-center">
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      image
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Name
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Price
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Category
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      seller
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Approve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {approvedProducts.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className="w-[70px] h-[70px] border border-gray-400 rounded-[8px] shadow p-1">
                            <img
                              className="w-full h-full object-contains"
                              src={ele.images[0]}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.name}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.price}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.category}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.seller}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className="flex justify-center items-center">
                            {ele.isApproved ? (
                              <Check color="#00bd26" strokeWidth={3} />
                            ) : (
                              ""
                            )}
                          </div>
                        </td>
                        {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Requested Product */}
          {product == "requested" && (
            <div>
              <table className="w-[100%]">
                <thead>
                  <tr className="text-center">
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      image
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      Product Name
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      Product Price
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      Category
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      seller
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] whitespace-nowrap align-middle">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {requestedProduct.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className="w-[70px] h-[70px] border border-gray-400 rounded-[8px] shadow p-1">
                            <img
                              className="w-full h-full object-contains"
                              src={ele.images[0]}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.name}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.price}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.category}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.seller}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className=" flex justify-evenly items-center">
                            <button
                              className="bg-green-500 hover:bg-green-800 py-1 px-4 rounded-[6px] text-white cursor-pointer mr-2 "
                              onClick={() => {
                                handleApprove(ele._id);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-800 py-1 px-4 rounded-[6px] text-white cursor-pointer"
                              onClick={() => {
                                handleReject(ele._id);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {product == "rejected" && (
            <div>
              <table className="w-[100%]">
                <thead>
                  <tr className="text-center">
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      image
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Name
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Price
                    </th>
                    <th className="border-b border-[#dfdee3] px-4  py-2  text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Category
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      seller
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Product Approve
                    </th>
                    <th className="border-b border-[#dfdee3] px-4 py-2 text-center text-[#a2a3a8] text-[15px] whitespace-nowrap align-middle">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedProduct.map((ele) => {
                    return (
                      <tr key={ele._id}>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className="w-[70px] h-[70px] border border-gray-400 rounded-[8px] shadow p-1">
                            <img
                              className="w-full h-full object-contains"
                              src={ele.images[0]}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.name}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.price}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.category}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          {ele.seller}
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <div className="flex justify-center items-center text-red-600">
                            {ele.rejected ? "Rejected" : ""}
                          </div>
                        </td>
                        <td className="border-b border-[#dfdee3]  py-2 text-center ">
                          <button
                            className="bg-green-500 hover:bg-green-800 py-1 px-4 rounded-[6px] text-white cursor-pointer "
                            onClick={() => {
                              handleApprove(ele._id);
                            }}
                          >
                            Approve
                          </button>
                        </td>
                        {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Products;
