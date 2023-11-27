import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useTrainer = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const { data: isTrainer, isLoading: isTrainerLoading } = useQuery({
    queryKey: [user?.email, "isTrainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/trainer/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [isTrainer, isTrainerLoading];
};

export default useTrainer;