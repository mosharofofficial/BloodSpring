import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../../Authentication/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useGetUser = () => {
  const myAxiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  // console.log(user.email);
  const {
    data: currentUser = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: [`${user.email}`],
    queryFn: async () =>
      await myAxiosSecure.get(`/getCurrentUser`, {
        params: {
          email: user.email,
        },
      }),
  });
  // console.log(currentUser.data);
  return { data: currentUser.data, isPending, refetch };
};

export default useGetUser;
