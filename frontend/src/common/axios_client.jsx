import axios from "axios";
import apiMessage from "./api_message";
import { refreshToken } from "../services/auth_service";
import clearData from "../utils/clear_data";

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
);

axiosClient.interceptors.response.use(
    async function (response) {
      if(response.data.message === apiMessage.tokenExpired) {
        await refreshAccessToken();
        return axiosClient.request(response.config);
      }

      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
);

const refreshAccessToken = async (res) => {
    try {
      const tokens = await refreshToken();
      localStorage.setItem('token', tokens.data.accessToken);
      localStorage.setItem('refreshToken', tokens.data.refreshToken);
    } catch (error) {
      console.error(error);
      await clearData();
    }
}

export default axiosClient;