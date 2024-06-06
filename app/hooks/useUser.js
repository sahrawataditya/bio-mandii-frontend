"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { axiosService } from "../lib/axiosService";

export const useUser = () => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axiosService.get("/getUser");
      if (response.data.success) {
        setUserData(response.data.user);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setToken(Cookies.get("token"));
    if (token) {
      axiosService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser();
    }
  }, [token]);

  return { userData, loading, token };
};
