import { Routes, Route, Navigate,useNavigate,useLocation } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
// import MenuBar from './components/MenuBar';
// import MainPage from './components/MainPage';
import ClasifiedApp from "./components/ClassifiedApp";
import Home from "./components/HomePage";
import Category from "./components/Category";
import CategoryForm from "./components/CategoryForm";
import Products from "./components/Product";
// import UsersPage from './components/userPage';
import UsersPage from "./components/UsersPage";
import Account from "./components/Account";
import MyProducts from "./components/MyProduct";
import ProductForm from "./components/ProductForm";
import ProductEnquiry from "./components/ProductEnquiry";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import ImageUpload from "./components/ImageUpload";
// import { Car } from 'lucide-react';
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import UnAuthorized from "./components/UnAuthorization";
import { fetchAccount } from "./slices/accountSlice";
import { listProducts } from "./slices/productSlice";
function App() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const { data, isLoggedIn } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(fetchAccount());
    }
  }, [isLoggedIn]);

  useEffect(()=>{
    dispatch(listProducts())
  })

  console.log(isLoggedIn);
  return (
    <div className="App">
      {/* <div className=" w-full flex justify-end fixed ">
        <h2 className="mb-4">Hello</h2>
      </div> */}
      
      <Routes>
        {/* Wrap all pages inside MainPage */}
        <Route element={<ClasifiedApp />}>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/login" element={isLoggedIn ? <Login /> : <Navigate to="/profile" replace />} /> */}

           <Route
            path="/login"
            element={
              localStorage.getItem('token') ? <Navigate to="/profile" replace /> : <Login />
            }
          />  
          
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />

          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["admin"]}>
                  <Category />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/category"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["admin"]}>
                  <CategoryForm />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/category/:id"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["admin"]}>
                  <CategoryForm />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["admin"]}>
                  <Products />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/user-page"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["admin"]}>
                  <UsersPage />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-product"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["seller"]}>
                  <MyProducts />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/product"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["seller"]}>
                  <ProductForm />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["seller"]}>
                  <ProductForm />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/product-enquiry/:id"
            element={
              <PrivateRoute>
                <ProtectedRoute roles={["seller"]}>
                  <ProductEnquiry />
                </ProtectedRoute>
              </PrivateRoute>
            }
          />
          <Route path="/product-detail/:id" element={<ProductDetail />} />

          <Route path="/view-cart" element={<Cart />} />
          <Route path="/image" element={<ImageUpload />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
