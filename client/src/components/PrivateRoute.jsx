// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// function PrivateRoute(props) {
//   const {isLoggedIn} =useSelector((state)=>{
//     return state.account;
//   });
//   const token = localStorage.getItem("token");
//   if (token) {
//     return props.children;
//   } else {
//     return <Navigate to="/login" replace />;
//   }
// }
// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
  const { isLoggedIn,data } = useSelector((state) => state.account);
  const token = localStorage.getItem("token");

  if (isLoggedIn || token) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default PrivateRoute;
