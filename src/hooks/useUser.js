import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useUser = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    data: userFromDB,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["role", user.email],
    queryFn: () =>
      axios
        .get(`/users?email=${user.email}`)
        .then((res) => res.data)
        .then((data) => data[0]),
  });

  return {
    user: userFromDB,
    isLoading,
    isError,
    error,
  };
};

export default useUser;
