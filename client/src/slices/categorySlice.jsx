import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import reducer from './accountSlice';



export const listCategories=createAsyncThunk('categories/listCategories',async()=>{
    try{
        const response=await axiosInstance.get('/category');
        // console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const createCategory=createAsyncThunk('categories/createCategory',async(formData)=>{
    try{
        // console.log(formData)
        const response=await axiosInstance.post('/category',formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
        // console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const updateCategory=createAsyncThunk('categories/updateCategory',async({id,formData},{})=>{

    try{
        // console.log(formData)
        const response=await axiosInstance.put(`/category/${id}`,formData,{
            headers: {
              Authorization: localStorage.getItem('token')      // 3rd argument: config with headers
            }
          });
        // console.log(response.data)
        return response.data;
    }catch(error){
        console.log(error)
    }
});

export const deleteCategory=createAsyncThunk('categories/deleteCategory',async(id)=>{
    try{
        const response=await axiosInstance.delete(`/category/${id}`,{
            headers:{
                Authorization:localStorage.getItem('token')
            }
        });
        return id;
    }catch(error){
        console.log(error);
    }
})


const categorySlice=createSlice({
        name:"categories",
        initialState:{
            data:[],
            serverError:null
        },
        extraReducers:(builder)=>{
            builder.addCase(listCategories.fulfilled,(state,action)=>{
                state.data=action.payload;
            });

            builder.addCase(createCategory.fulfilled,(state,action)=>{
                state.data.push(action.payload)
            });

            builder.addCase(deleteCategory.fulfilled,(state,action)=>{
                // state.data.push(action.payload)
                state.data=state.data.filter((ele)=>{
                    return ele._id !==action.payload;
                })
            });

            builder.addCase(updateCategory.fulfilled,(state,action)=>{
                // const index=state.data.findIndex((ele)=>{
                //     return ele._id==state.editId;
                // })
                // state.data[index]=action.payload;
                // state.editId='';
                // console.log(action.payload)
            });
        },
        // reducers:{
        //     assignEditId:(state,action)=>{
        //         state.editId=action.payload;
        //     }
        // }
    }
);

// export const {assignEditId} = categorySlice.actions
export default categorySlice.reducer;