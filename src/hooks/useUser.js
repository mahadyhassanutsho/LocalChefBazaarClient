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
    queryKey: ["get-user-by-email", user.email],
    queryFn: () =>
      axios
        .get(`/users?email=${user.email}`)
        .then((res) => res.data)
        .then((data) => data[0]),
  });

  if (isError) throw new Error(error.message);

  return {
    user: userFromDB,
    isLoading,
  };
};

export default useUser;
