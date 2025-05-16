import SideBar from "./SideBar";
// import MainPage from "./MainPage";
import MenuBar from "./MenuBar";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleUser } from "lucide-react";
function ClasifiedApp() {
  const { data } = useSelector((state) => {
    return state.account;
  });

  // console.log(data.profileImage);
  return (
    <div>
      <div className="ml-[1px] mr-4">
        <MenuBar />
        
          {localStorage.getItem("token") && (
            <div className=" w-full flex justify-end items-center fixed top-11 right-2  z-50 bg-transparent ">
              <Link to="/profile">
              <span className="flex items-center border border-purple-400 px-[4px] pl-[6px] py-1 shadow rounded ml-2">
                {data?.name}
                {!data?.profileImage || data?.profileImage === "undefined" ? (
                  <CircleUser className="ml-1" />
                ) : (
                  <img
                    className="w-5 h-5 rounded-full ml-1"
                    src={data.profileImage}
                    alt="Profile"
                  />
                )}
              </span>
              </Link>
            </div>
          )}
       
      </div>

      <div className="flex mt-12">
        {data && localStorage.getItem("token") ? (
          <div className=" h-screen  fixed rounded-[6px] ml-[1px]">
            <SideBar />
          </div>
        ) : null}

        <div
          className={
            data && localStorage.getItem("token")
              ? "w-600 ml-35 mr-2"
              : "w-600 ml-3 mr-2"
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default ClasifiedApp;
