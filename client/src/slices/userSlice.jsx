import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';



export const listUsers=createAsyncThunk('users/listUsers',async()=>{
    try{
        const response=await axiosInstance.get('/users',{
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


export const activeUser=createAsyncThunk('users/activeUser',async(id)=>{
    try{
        const response=await axiosInstance.put(`/activation/${id}`,{isActive:true},{
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



const userSlice=createSlice({
        name:"users",
        initialState:{
            data:[],
            serverError:null
        },
        extraReducers:(builder)=>{
            builder.addCase(listUsers.fulfilled,(state,action)=>{
                state.data=action.payload;
            });

            builder.addCase(activeUser.fulfilled,(state,action)=>{
                const index=state.data.findIndex((ele)=>{
                    return ele._id==action.payload._id
                });
                state.data.splice(index,1,action.payload);
            });

            // builder.addCase(deleteUser.fulfilled,(state,action)=>{
            //     // state.data.push(action.payload)
            //     state.data=state.data.filter((ele)=>{
            //         return ele._id !==action.payload;
            //     })
            // })
        }
    }
)

export default userSlice.reducer;