import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useApiCall } from "../../hook";
import { getChart } from "../../service/userService";
import { useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const [data, setData] = useState({
    labels: ["Dưới 15", "15 đến 24", "25 đến 30"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  });
  useApiCall(async () => {
    const res = await getChart();
    setData({
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: [
            res.lessThan15,
            res.between15To25,
            res.between25To30,
          ],
        },
      ],
    });
    return res;
  });
  return (
    <div className="w-[90vw] lg:w-[300px] mx-auto">
      <Pie data={data} />
      <h2 className="text-center mt-5  uppercase">Thống kê điểm</h2>
    </div>
  );
};

export default PieChart;
