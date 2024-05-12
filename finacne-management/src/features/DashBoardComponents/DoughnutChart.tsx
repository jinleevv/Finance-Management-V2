import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
  const spentAmount = 200;
  const remainingAmount = 3000 - spentAmount;

  const data = {
    datasets: [
      {
        data: [spentAmount, remainingAmount],
        backgroundColor: ["#000000", "#ccc"], // Assuming a different color for the remaining amount
      },
    ],
    labels: [`Spent: $${spentAmount}`, `Remaining: $${remainingAmount}`],
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
