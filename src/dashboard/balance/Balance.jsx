import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["/admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  console.log(stats);

  const data = [
    { name: "Total Subscriber", value: stats.totalSubscriber },
    { name: "Total paid user", value: stats.totalPaidUser },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="px-10 ">
      <SectionTitle>Balance</SectionTitle>
      <div className="stats shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">${stats.revenue}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Payment</div>
          <div className="stat-value text-secondary">{stats.payment}</div>
          <div className="stat-desc text-secondary"> - ${stats.revenue}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Remaining Balance</div>
          <div className="stat-value">{stats.revenue - stats.payment}</div>
          <div className="stat-desc">↘︎</div>
        </div>
      </div>
      {/* <ResponsiveContainer> */}
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default Balance;
