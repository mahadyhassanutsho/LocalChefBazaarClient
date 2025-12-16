import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsPage = () => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axios.get("/stats").then((res) => res.data),
  });

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  const {
    totalUsers,
    totalChefs,
    totalMeals,
    totalOrders,
    totalReviews,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
    ordersLast7Days,
  } = data;

  /* ---------- Chart Data ---------- */

  const ordersStatusData = [
    { name: "Pending", value: pendingOrders },
    { name: "Delivered", value: deliveredOrders },
    { name: "Cancelled", value: cancelledOrders },
  ];

  const totalsData = [
    { label: "Users", value: totalUsers },
    { label: "Chefs", value: totalChefs },
    { label: "Meals", value: totalMeals },
    { label: "Orders", value: totalOrders },
    { label: "Reviews", value: totalReviews },
    { label: "Revenue (৳)", value: totalRevenue },
  ];

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-4xl font-bold">Platform Statistics</h2>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {totalsData.map((item) => (
          <div
            key={item.label}
            className="w-full bg-base-100 shadow rounded-box p-6 text-center"
          >
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-sm opacity-60">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Status */}
        <div className="bg-base-100 shadow rounded-box p-6">
          <h3 className="text-xl font-semibold mb-4">Orders Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ordersStatusData} dataKey="value" label>
                {ordersStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Orders & Revenue Trend */}
        <div className="bg-base-100 shadow rounded-box p-6">
          <h3 className="text-xl font-semibold mb-4">
            Orders & Revenue (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ordersLast7Days}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#0088FE" />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
