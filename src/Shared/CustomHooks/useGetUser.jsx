import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../../Axios.config";
import { useContext } from "react";
import { authContext } from "../../Authentication/AuthProvider";

const useGetUser = () => {
  // console.log(localStorage.getItem("access-token"));
  const { user } = useContext(authContext);
<<<<<<< HEAD
  const {
    data: currentUser = {},
    isPending,
    refetch,
  } = useQuery({
=======
  const { data: currentUser = {}, isPending } = useQuery({
>>>>>>> 12ec375f63a17df63ce591264dc738ff3d841519
    queryKey: ["currentUserData"],
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
<<<<<<< HEAD
  return { data: currentUser.data, isPending, refetch };
=======
  return { data: currentUser.data, isPending };
>>>>>>> 12ec375f63a17df63ce591264dc738ff3d841519
};

export default useGetUser;
