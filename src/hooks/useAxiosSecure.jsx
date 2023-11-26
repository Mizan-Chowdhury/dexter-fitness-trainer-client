import axios from "axios";
import { useEffect } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const {logOutUser} = useAuthContext();
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.response.use((res)=>{
            return res;
        }, (error) =>{
            console.log('from interceptor', error.response)
            if(error.response.status === 401 || error.response.status === 403){
                logOutUser()
                .then(res=>{
                    console.log(res);
                    navigate('/login')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        })
    },[])
    return axiosSecure
};

export default useAxiosSecure;