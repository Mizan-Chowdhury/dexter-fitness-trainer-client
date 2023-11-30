import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuthContext from "./useAuthContext";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loader } = useAuthContext();
  const { data: users } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: loader,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res?.data;
    },
  });
  console.log(users?.role);
  return [users];
};

export default useUsers;
