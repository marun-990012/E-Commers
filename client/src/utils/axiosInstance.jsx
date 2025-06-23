import axios from "axios"

const axiosInstance = axios.create({
    // baseURL : "http://localhost:3039"
    baseURL : "https://e-commers-47u8.onrender.com"
})
export default axiosInstance