import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxios from "../../hooks/useAxios";
import MealCard from "../../ui/meal/MealCard";
import Loader from "../../ui/shared/Loader";

const MealsPage = () => {
  const axios = useAxios();
  const [sort, setSort] = useState("asc");
  const {
    data: meals,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-all-meals", sort],
    queryFn: () =>
      axios.get(`/meals?sort=price&order=${sort}`).then((res) => res.data),
  });

  const handleSortChange = async (e) => {
    setSort(e.target.value);
  };

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-4 bg-base-200 p-6 rounded-box">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold">Latest Meals</h2>
        <p className="text-base text-base-content/75 max-w-xl mx-auto">
          Explore delicious homemade meals freshly prepared by our skilled
          chefs.
        </p>
      </div>

      <p className="text-lg text-base-content/50 font-semibold text-center">
        Showing {meals.length} {meals.length === 1 ? "meal" : "meals"}
      </p>

      <div className="flex items-center gap-2">
        <label className="ml-2 text-lg font-bold">Sort by:</label>

        <select
          className="select w-fit border-base-300"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
        </select>
      </div>

      {meals.length === 0 ? (
        <div className="text-center py-12 text-base-content/75 text-lg">
          No meals found. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsPage;
