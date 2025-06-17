import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { act } from "react";


export const createProduct=createAsyncThunk('products/createProduct',async(formData,{ rejectWithValue })=>{
    console.log(formData)
    try{
        const response=await axiosInstance.post(`/product`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
          console.log(response.data)
        // return response.data
    }catch(error){
        console.log(error)
    }
});

export const uploadImage=createAsyncThunk('products/uploadImage',async(formData,{ rejectWithValue })=>{
    // console.log(formData)
    try{
        const response=await axiosInstance.post('/upload',formData);
          console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const updateProduct=createAsyncThunk('products/updateProduct',async({id,formData},{ rejectWithValue })=>{
    // console.log(formData);
    // console.log(id);
    try{
        const response=await axiosInstance.put(`/product/${id}`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
          console.log(response.data)
        // return response.data
    }catch(error){
        console.log(error)
    }
});

export const listProducts=createAsyncThunk('products/listProducts',async()=>{
    try{
        const response=await axiosInstance.get('/product');
        // console.log(response.data);
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const approveProduct=createAsyncThunk('products/approveProduct',async(id)=>{
    try{
        const response=await axiosInstance.put(`/productapprove/${id}`,{isApproved:true,rejected:false},{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const rejectProduct=createAsyncThunk('products/rejectProduct',async(id)=>{
    console.log(id)
    try{
        const response=await axiosInstance.put(`/productapprove/${id}`,{isApproved:false,rejected:true},{
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

export const fetchMyProducts=createAsyncThunk('products/fetchMyProducts',async(id)=>{
    console.log(id)
    try{
        const response=await axiosInstance.get(`/productmy`,{
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


export const deleteProduct=createAsyncThunk('products/deleteProduct',async(id)=>{
    console.log(id)
    try{
        const response=await axiosInstance.delete(`/product/${id}`,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
          console.log(response.data)
        return id;
    }catch(error){
        console.log(error)
    }
});


export const viewProduct=createAsyncThunk('products/viewProduct',async(id)=>{
    // console.log(id)
    try{
        const response=await axiosInstance.get(`/product/${id}`);
        //   console.log(response.data)
        return response.data ;
    }catch(error){
        console.log(error)
    }
});

export const sendEnquiry=createAsyncThunk('products/sendEnquiry',async({id,formData},{})=>{
    // console.log(id)
    try{
        const response=await axiosInstance.post(`/enquiry/${id}`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
          console.log(response.data)
        return response.data ;
    }catch(error){
        console.log(error)
    }
});


export const sendResponse=createAsyncThunk('products/sendResponse',async({id,formData},{})=>{
    // console.log(id)
    try{
        const response=await axiosInstance.post(`/response/${id}`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
          console.log(response.data);
        return response.data ;
    }catch(error){
        console.log(error)
    }
});






const productSlice=createSlice({
    name:"products",
    initialState:{
        data:[],
        uploadImage:'',
        editId:'',
        productDetail:{}
    },
    extraReducers:(builder)=>{
        
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.data.push(action.payload);
        });

        builder.addCase(uploadImage.fulfilled,(state,action)=>{
            state.uploadImage=action.payload;
        });

        builder.addCase(updateProduct.fulfilled,(state,action)=>{
        //     const index=state.data.findIndex((ele)=>{
        //     return ele._id==action.payload._id;
        //   })
        //    state.data[index]=action.payload;
        //    state.editId='';
            // console.log(action.payload)
         });

        builder.addCase(listProducts.fulfilled,(state,action)=>{
            state.data=action.payload;
        });

        builder.addCase(approveProduct.fulfilled,(state,action)=>{
            const index=state.data.findIndex((ele)=>{
                return ele._id==action.payload._id
            });
            state.data.splice(index,1,action.payload);
        });

        builder.addCase(rejectProduct.fulfilled,(state,action)=>{
            const index=state.data.findIndex((ele)=>{
                return ele._id==action.payload._id
            });
            state.data.splice(index,1,action.payload);
            
        });

        builder.addCase(fetchMyProducts.fulfilled,(state,action)=>{
            // const index=state.data.findIndex((ele)=>{
            //     return ele._id==action.payload._id
            // });
            // state.data.splice(index,1,action.payload);
            state.data=action.payload;
        });

        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.data=state.data.filter((ele)=>{
                return ele._id !=action.payload;
            });
        });

        builder.addCase(viewProduct.fulfilled,(state,action)=>{
            state.productDetail=action.payload;
            
        });

        builder.addCase(sendEnquiry.fulfilled,(state,action)=>{
            // const index=state.data.findIndex((ele)=>{
            //     return ele._id==action.payload._id
            // });
            // console.log(state.data)
            // state.data.splice(index,1,action.payload);
            state.productDetail=action.payload;
        });

        builder.addCase(sendResponse.fulfilled,(state,action)=>{
            const index=state.data.findIndex((ele)=>{
                return ele._id==action.payload._id
            });
            state.data.splice(index,1,action.payload);
            // state.data=action.payload;
        });
    },
    reducers:{
        assignEditId:(state,action)=>{
            state.editId=action.payload;
        }
    }
});

export const {assignEditId} = productSlice.actions;
export default productSlice.reducer;