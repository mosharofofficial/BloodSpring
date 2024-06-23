import { useQuery } from "@tanstack/react-query";
import { myAxiosSecure } from "../../Axios.config";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Authentication/AuthProvider";

const useGetUser = () => {
  const { user } = useContext(authContext);
    const { data: currentUser = {}, refetch } = useQuery({
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
  return currentUser.data;
};

export default useGetUser;
