import axios from "axios";

export const axiosService = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});
