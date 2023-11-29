import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useAdmin from "../hooks/useAdmin";

const PrivateAdmin = ({children}) => {
  const { user, loader } = useAuthContext();
  const location = useLocation();
  const [isAdmin ,isAdminLoading] = useAdmin();

  if (loader || isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user && !isAdmin) {
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateAdmin;
