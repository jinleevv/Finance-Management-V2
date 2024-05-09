import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CountUp from "react-countup";
import { DoughnutChart } from "@/features/DashBoardComponents/DoughnutChart";

export function CardBalanceInformation() {
  function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  return (
    <Card className="flex mt-2 w-full shadow-lg">
      <CardHeader>
        <div className="h-40 w-40">
          <DoughnutChart />
        </div>
      </CardHeader>
      <CardContent className="mt-6">
        <div>
          <CardTitle className="text-2xl">Current Balance</CardTitle>
          <CardDescription>Corporate Credit Card Limit: $3,000</CardDescription>
        </div>
        <div className="flex mt-5 space-x-5">
          <Label className="text-md font-bold space-x-1">
            <span>Current Balance:</span>
            <CountUp
              decimals={2}
              decimal=","
              prefix="$"
              end={1200}
              duration={1}
            />
          </Label>
          <Label className="text-md font-bold space-x-1">
            <span>Remaining Balance:</span>
            <CountUp
              decimals={2}
              decimal=","
              prefix="$"
              end={1200}
              duration={1}
            />
          </Label>
        </div>
        <div>
          <Label className="text-md font-bold space-x-1">Status: Good</Label>
        </div>
      </CardContent>
    </Card>
  );
}
