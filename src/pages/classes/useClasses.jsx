import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const useClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes , isLoading} = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  return [classes, isLoading];
};

export default useClasses;
