import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from 'react-router-dom';
import { createCategory,listCategories,updateCategory} from "../slices/categorySlice";
function CategoryForm(){
    const [name,setName] = useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {id} = useParams();
    // console.log(id);

    useEffect(()=>{
      dispatch(listCategories());

  },[]);

  const {data,serverError,editId}=useSelector((state)=>{
    return state.categories;
});

// console.log(id && data.length > 0)
//     const categories=useSelector((state)=>{
//       return state.categories;
//     });

    // console.log(categories)

    useEffect(()=>{

      if(id && data.length > 0){
        const category=data.find((ele)=>{
          return ele._id==id;
        });
        console.log(category);
        if(category){
          setName(category.name);
        }
      }
      
    },[id,data]);

    // useEffect(() => {
    //   if (categories.editId && categories.data.length > 0) {
    //     const category = categories.data.find((ele) => ele._id === categories.editId);
    //     if (category) {
    //       setName(category.name);
    //     }
    //   }
    // }, [categories.editId, categories.data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(id){
          const category=data.find((ele)=>{
            return ele._id==id
          });

          // const formData = { name };
          // const id=categories.editId;
          const formData = { ...category, name: name };
          const result = await dispatch(updateCategory({id,formData}));
          if (updateCategory.fulfilled.match(result)) {
            await dispatch(listCategories()); // 🔄 update data before navigating
            navigate('/categories');           // ✅ navigate after fresh data is in Redux
          } else {
            console.error("Failed to create category");
          }

        }else{

          const formData = { name };
          const result = await dispatch(createCategory(formData));
        
          if (createCategory.fulfilled.match(result)) {
            await dispatch(listCategories()); // 🔄 update data before navigating
            navigate('/categories');           // ✅ navigate after fresh data is in Redux
          } else {
            console.error("Failed to create category");
          }
        }
       
      };


    return(
        <div className="flex justify-center items-center h-screen border border-muted rounded shadow-medium shadow-[10px] mb-4 ">
            <div className="border py-5 px-4 w-80 border-[#c4c4c4] rounded-[8px] shadow">
                <div>
                <h2>Create New Category</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input type="text"  placeholder="Enater Category Name" className="border border-[#c4c4c4] rounded shadow mt-3 px-2 py-[3px] focus:border-blue-500 outline-none placeholder-[#aba7a7] w-[100%]" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    <div className="mt-5 text-center bg-green-600 text-white px-6 py-1 rounded-[6px] hover:bg-green-800">
                      <input type="submit" value='Add Category' className="cursor-pointer" />
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
export default CategoryForm;