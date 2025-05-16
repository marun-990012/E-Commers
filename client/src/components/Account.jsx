import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccount, deleteAccount,updatAccount } from "../slices/accountSlice";
import { Camera } from "lucide-react";
import axios from "axios";
function Account() {
  const [file, SetFile] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoggedIn } = useSelector((state) => {
    return state.account;
  });

  useEffect(() => {
    if (localStorage.getItem("token") && isLoggedIn) {
      dispatch(fetchAccount());
    }
  }, [dispatch]);

  // console.log(data)
  const handleDeleteAccount = async () => {
    const request = confirm("You wants to delete your account");
    // console.log(request)
    if (request) {
      const result = await dispatch(deleteAccount(data._id));

      if (deleteAccount.fulfilled.match(result)) {
        navigate("/login");
      }
    }
  };
useEffect(()=>{
    
    if(file){
        async function uploadImage(){
            // alert('hi')
            const form =new FormData();
            form.append('file',file);
            // console.log(formData)
            try{
              axios.post('http://localhost:3039/upload',form).then((res)=>{
              console.log(res.data.secure_url);
              const formData={profileImage:res.data.secure_url};
              const id=data._id;
              dispatch(updatAccount({id,formData}))
              }).catch((err)=>{console.log(err)})
                // console.log(response.data);
            }catch(error){
                console.log(error);
            }
            
        }
        uploadImage();
    }
},[file]);
  // console.log(data);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border py-10 px-5 rounded-[4px] mr-20 w-75">
        {/* <h2 className="bg-gray-200 text-center rounded py-1">User Profile!</h2> */}
        <div className="flex items-center justify-center">
          
          <div className="p-1 rounded-full bg-gradient-to-tr from-pink-700 via-purple-700 to-[#ebff0b]">
            <div className="h-20 w-20 rounded-full bg-cover bg-center relative"style={{ backgroundImage: `url(${data?.profileImage})` }}>
              {/* File input button */}
              <label className="absolute bottom-[1px] right-1 bg-green-500 p-1 rounded-full cursor-pointer">
                <Camera color="white" size={15} />
                <input type="file" className="hidden" onChange={(e)=>{SetFile(e.target.files[0])}}/>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {data && (
            <div>
              <p className="mb-3">
                Name : <span className="text-gray-600">{data.name}</span>
              </p>
              <p className="mb-3">
                Email : <span className="text-gray-600">{data.email}</span>
              </p>
              <p className="mb-3">
                Role : <span className="text-gray-600">{data.role}</span>
              </p>
            </div>
          )}

          <div className="mt-7 flex justify-evenly">
            <button className="bg-yellow-600 hover:bg-yellow-800 px-3 py-1 rounded text-white text-[13px] cursor-pointer ">
              Update Profile
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded text-white text-[13px] cursor-pointer "
              onClick={() => {
                handleDeleteAccount();
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;

// function Account() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//       if (localStorage.getItem("token")) {
//         dispatch(fetchAccount());
//       }
//     }, [dispatch]);

//     const { data } = useSelector((state) => state.account);

//     const handleDeleteAccount = async () => {
//       const request = confirm("You want to delete your account?");
//       if (request) {
//         const result = await dispatch(deleteAccount(data._id));
//         if (deleteAccount.fulfilled.match(result)) {
//           navigate("/login");
//         }
//       }
//     };

//     if (!data || Object.keys(data).length === 0) {
//       return (
//         <div className="flex justify-center items-center h-screen">
//           <p className="text-gray-600 text-lg">Loading profile...</p>
//         </div>
//       );
//     }

//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="border py-10 px-5 rounded-[4px] mr-20 w-75">
//           <h2 className="bg-gray-200 text-center rounded py-1">User Profile!</h2>
//           <div className="mt-5">
//             <p className="mb-3">
//               Name : <span className="text-gray-600">{data.name}</span>
//             </p>
//             <p className="mb-3">
//               Email : <span className="text-gray-600">{data.email}</span>
//             </p>
//             <p className="mb-3">
//               Role : <span className="text-gray-600">{data.role}</span>
//             </p>

//             <div className="mt-7 flex justify-evenly">
//               <button className="bg-yellow-600 hover:bg-yellow-800 px-3 py-1 rounded text-white text-[13px] cursor-pointer">
//                 Update Profile
//               </button>
//               <button
//                 className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded text-white text-[13px] cursor-pointer"
//                 onClick={handleDeleteAccount}
//               >
//                 Delete Account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//  export default Account
