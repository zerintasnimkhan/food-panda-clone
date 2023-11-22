import axios from "axios";

export async function cldUpload (restaurantId, file, folder = 'restaurant') {

  const formData = new FormData();
  const file_name = file.name.split('.')[0];
  const public_id = restaurantId + '_' + Date.now() + '_' + file_name;
  
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
  formData.append("public_id", public_id);
  formData.append("folder", folder);
  
  try {
    const res = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, formData);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}