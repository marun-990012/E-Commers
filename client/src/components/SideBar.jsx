import { Navigation } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo (2).png";
import { logout } from "../slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";
function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => {
    return state.account;
  });
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="w-30 ">
      <div className="h-[500px] mb-200  bg-gray-900 rounded-[12px] ">
        <div className="flex flex-col justify-between items-center h-full ">
          {/* Top Section */}
          <div className="mt-4 w-full">
            <img
              className="w-[200px] h-[65px] p-1 rounded-full"
              src={logo}
              alt="Logo"
            />
          </div>

          {/* Middle Navigation Section */}
          
          <div className={data?.role=='seller' ||data?.role=='buyer' ?"text-[14px] w-full px-3  h-[100px] flex flex-col justify-evenly ":"text-[14px] w-full px-3  h-[250px] flex flex-col justify-between"}>
            
              <Link className="text-white" to="/profile">
              <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                Profile
              </div>
            </Link>
            
            {data?.role == "buyer" && (
              <Link className="text-white" to="/">
                <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                  Home
                </div>
              </Link>
            )}

            {data?.role == "admin" && (
              <Link className="text-white" to="/categories">
                <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                  Category
                </div>
              </Link>
            )}

            {data?.role == "admin" && (
              <Link className="text-white" to="/products">
                <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                  Products
                </div>
              </Link>
            )}

            {data?.role == "admin" && (
              <Link className="text-white" to="/user-page">
                <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                  Users
                </div>
              </Link>
            )}

            {data?.role == "seller" && (
              <Link className="text-white" to="/my-product">
                <div className="bg-[#1b232e] hover:bg-[#4f2bdf] py-[2px] px-3 rounded-full cursor-pointer mt-2">
                  My Product
                </div>
              </Link>
            )}
          </div>

          {/* Bottom Section */}
          <div className="mb-4 p-1 bg-gray-600 rounded-full">
            <button
              className="text-black bg-white px-4 py- rounded-full cursor-pointer hover:text-red-500 font-medium"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBar;
