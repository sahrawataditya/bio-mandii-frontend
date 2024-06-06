import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://bio-mandii-backend.onrender.com/api/v1",
});
