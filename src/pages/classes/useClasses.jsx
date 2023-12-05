import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuthContext from "../../hooks/useAuthContext";

const useClasses = () => {
  const axiosSecure = useAxiosSecure();
  const {loader} = useAuthContext();

  const { data: classes, isLoading} = useQuery({
    queryKey: ["classes"],
    enabled: loader,
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  return [classes, isLoading];
};

export default useClasses;
