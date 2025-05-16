import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import reducer from './accountSlice';



export const listCategories=createAsyncThunk('categories/listCategories',async()=>{
    try{
        const response=await axios.get('http://localhost:3039/category');
        // console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
    }
});


export const createCategory=createAsyncThunk('categories/createCategory',async(formData)=>{
    try{
        // console.log(formData)
        const response=await axios.post('http://localhost:3039/category',formData,{
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

    // console.log(id)
    // console.log(formData)
    try{
        // console.log(formData)
        const response=await axios.put(`http://localhost:3039/category/${id}`,formData,{
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
        const response=await axios.delete(`http://localhost:3039/category/${id}`,{
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