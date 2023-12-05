import axios from "axios";

const instance = axios.create({
  baseURL: "https://dexter-fitness-trainer-server.vercel.app",
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
