import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';


export const login=createAsyncThunk('account/login',async(formData)=>{
    try{
        const response=await axiosInstance.post('/login',formData);
        // console.log(response.data)
        localStorage.setItem('token',response.data.token);

        return response.data.token
    }catch(error){
        console.log(error)
    }
});

export const fetchAccount=createAsyncThunk('account/listUsers',async()=>{
    try{
        const response=await axiosInstance.get('/account',{
            headers: {
              Authorization: localStorage.getItem('token')     // 3rd argument: config with headers
            }
          });
        // console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const updatAccount=createAsyncThunk('users/updatAccount',async({id,formData},{})=>{
    console.log(id,formData)
    try{
        // console.log(formData)
        const response=await axiosInstance.put(`/upload-image/${id}`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
        console.log(response.data)
      
        return response.data
    }catch(error){
        console.log(error)
    }
});

export const deleteAccount=createAsyncThunk('users/deleteAccount',async(id)=>{
    try{
        const response=await axiosInstance.delete(`/remove/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        return id;
    }catch(error){
        console.log(error);
    }
});


export const addToCart=createAsyncThunk('products/addToCart',async(id,{})=>{
    // console.log(id)
    try{
        const response=await axiosInstance.post(`/cart/${id}`,{},{
            headers: {
              Authorization: localStorage.getItem('token')     // 3rd argument: config with headers
            }
          });
          console.log(response.data);
        return response.data ;
    }catch(error){
        console.log(error)
    }
});


export const removeCart=createAsyncThunk('products/removeCart',async(id,{})=>{
    // console.log(id)
    try{
        const response=await axiosInstance.post(`/remove-cart/${id}`,{},{
            headers: {
              Authorization: localStorage.getItem('token')     // 3rd argument: config with headers
            }
          });
          console.log(response.data);
        return response.data ;
    }catch(error){
        console.log(error)
    }
});


const accountSlice=createSlice({
        name:"account",
        initialState:{
            data:{},
            serverError:null,
            isLoggedIn:false
        },
        extraReducers:(builder)=>{
            builder.addCase(login.fulfilled,(state,action)=>{
                // localStorage.setItem('token',action.payload.token)
                // state.isLoggedIn=localStorage.getItem('token')?true:false;
                // state.data=action.payload
                state.isLoggedIn=true
                
            });

            builder.addCase(fetchAccount.fulfilled,(state,action)=>{
                state.data=action.payload;
                // state.isLoggedIn=true
            });

            builder.addCase(updatAccount.fulfilled,(state,action)=>{
                state.data=action.payload;
                // state.isLoggedIn=true
            });

            builder.addCase(deleteAccount.fulfilled,(state,action)=>{
                state.data={};
                localStorage.removeItem('token');
            });

            builder.addCase(addToCart.fulfilled,(state,action)=>{
                state.data=action.payload;
            });

            builder.addCase(removeCart.fulfilled,(state,action)=>{
                state.data=action.payload;
            });

            
                   
        },
        reducers: {
            logout: (state,action) => {
              state.data = {};
              state.isLoggedIn=false
              localStorage.removeItem("token");
            },
          },
    }
)

export const {logout} = accountSlice.actions;
export default accountSlice.reducer;