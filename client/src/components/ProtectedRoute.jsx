// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";


// function ProtectedRoute(props){
//     const {data} =useSelector((state)=>{
//         return state.user;
//     });
//     console.log(props.roles.includes(data.role))

//     if(props.roles.includes(data.role)){
//         return props.children;
//     }else{
//         <Navigate to='/unauthorized' replace/>
//     }
// }
// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// export default function ProtectedRoute(props){
//     const {data}=useSelector((state)=>{
//         return state.account;
//     });
//     // console.log(data)
//     if(props.roles.includes(data.role)){
//         return props.children
//     }else{
//         return <Navigate to='/unauthorized' replace />
//     }
// }


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute(props) {
  const { data } = useSelector((state) => state.account);

  // If data is still loading or empty, don’t render anything yet
  if (!data || Object.keys(data).length === 0) {
    return null; // or a spinner/loading component
  }

  if (props.roles.includes(data.role)) {
    return props.children;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
}
