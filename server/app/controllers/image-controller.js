
const imageController = {};

// Upload product image
imageController.uploadImage=async(req,res)=>{
    try {
          const file = req.file.path;
      
          const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: 'classified_App_images',
          });
      
          return  res.json(cloudinaryResponse);
        } catch (err) {
          console.error("Error uploading image to Cloudinary:", err);
          return  res.status(500).json({ error: "Failed to upload image" });
        }
}

export default imageController