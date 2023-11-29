import { useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useGymMember = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuthContext();
  const { data: isUser, isLoading: isUserLoading } = useQuery({
    queryKey: [user?.email, "isUser"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/users/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [isUser, isUserLoading];
};

export default useGymMember;
