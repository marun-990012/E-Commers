<table className="w-[100%]">
                    <thead>
                        <tr className="text-center">
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">image</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Product Name</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Product Price</th>
                        <th className="border-b border-[#dfdee3] px-20  py-2  text-center text-[#a2a3a8]">Category</th>
                        <th className="border-b border-[#dfdee3] px-20 py-2 text-center text-[#a2a3a8]">seller</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {data.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">image</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.name}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.price}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.category}</td>
                                    <td className="border-b border-[#dfdee3]  py-2 text-center ">{ele.seller}</td>
                                    {/* <td className="border-b border-[#dfdee3]  py-2 text-center"><button className="mr-5 bg-[#ffc000] hover:bg-[#bc9212] text-white px-6 py-1 rounded-[6px] cursor-pointer">edit</button><button className="mr-5 bg-red-600 hover:bg-red-800 text-white px-6 py-1 rounded-[6px] cursor-pointer" onClick={()=>{handleDelete(ele._id)}}>delete</button></td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>