import { useContext } from "react";
import { AuthContext } from "../routers/AuthProvider";

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;