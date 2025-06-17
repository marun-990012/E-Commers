import axios from "axios"

const axiosInstance = axios.create({
    baseURL : "http://localhost:3039"
})
export default axiosInstance