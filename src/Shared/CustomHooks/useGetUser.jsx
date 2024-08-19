import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../../Axios.config";
import { useContext } from "react";
import { authContext } from "../../Authentication/AuthProvider";

const useGetUser = () => {
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
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        params: {
          email: user.email,
        },
      }),
  });
  // console.log(currentUser.data);
  return { data: currentUser.data, isPending, refetch };
};

export default useGetUser;
