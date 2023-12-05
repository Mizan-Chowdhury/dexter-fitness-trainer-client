import axios from "axios";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://dexter-fitness-trainer-server.vercel.app",
});
const useAxiosSecure = () => {
  const { logOutUser } = useAuthContext();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `bearer ${token}`;
      // console.log('eikhane', token)
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const status = err.response.status;
      console.log(status);
      if (status === 401 || status === 403) {
        await logOutUser();
        navigate("/login");
      }

      return Promise.reject(err);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
