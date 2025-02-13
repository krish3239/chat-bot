import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"https://chat-bot-backend-kwxg.onrender.com/api",
    withCredentials:true,
})
