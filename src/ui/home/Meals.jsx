import { useQuery } from "@tanstack/react-query";

import useAxios from "../../hooks/useAxios";
import MealCard from "../meal/MealCard";
import Loader from "../shared/Loader";

const Meals = () => {
  const axios = useAxios();
  const {
    data: meals,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-all-meals"],
    queryFn: () =>
      axios
        .get("/meals?limit=6&sort=avgRating&order=desc")
        .then((res) => res.data),
  });

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-4">
      <h2 className="text-4xl font-bold border-l-4 pl-4 border-accent">
        Latest Meals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Meals;
