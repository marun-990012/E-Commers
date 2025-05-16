import { useState } from "react";
import axios from "axios";
function ImageUpload(){
    const [file,setFile] = useState('');
    
    const upload=async()=>{
        alert('hi')
        const formData =new FormData();
        formData.append('file',file);
        console.log(formData)
        try{
          axios.post('http://localhost:3039/upload',formData).then((res)=>{
            console.log(res.data.secure_url)
          }).catch((err)=>{console.log(err)})
            // console.log(response.data);
        }catch(error){
            console.log(error);
        }
        
    }
    return (
        <div>
            <h2>Image Upload</h2>
            <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} className="border" />
            <button onClick={upload}>Upload</button>
        </div>
    )
}
export default ImageUpload;