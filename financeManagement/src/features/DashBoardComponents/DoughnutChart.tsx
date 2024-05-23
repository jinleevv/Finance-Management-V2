import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartType {
  currentBalance: number;
  remainingBalance: number;
}

export function DoughnutChart({
  currentBalance,
  remainingBalance,
}: DoughnutChartType) {
  const data = {
    datasets: [
      {
        data: [currentBalance, 1000000],
        backgroundColor: ["#000000", "#ccc"], // Assuming a different color for the remaining amount
      },
    ],
    labels: [`Spent: $${currentBalance}`, `Remaining: $0`],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
