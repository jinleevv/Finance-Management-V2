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
import { useEffect, useState } from "react";
import { useHooks } from "@/hooks";

export function CardBalanceInformation() {
  const { clientI, userDepartment } = useHooks();
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [remainingBalance, setRemainingBalance] = useState<number>(10000);

  function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  useEffect(() => {
    clientI.get("/api/department-credit-balance/").then((res) => {
      const amount = remainingBalance - res.data[userDepartment];
      if (amount !== currentBalance) {
        setRemainingBalance(amount);
        setCurrentBalance(res.data[userDepartment]);
      }
    });
  }, []);

  return (
    <Card className="lg:flex mt-2 w-full shadow-lg">
      <CardHeader>
        <div className="h-40 w-40">
          <DoughnutChart
            currentBalance={currentBalance}
            remainingBalance={remainingBalance}
          />
        </div>
      </CardHeader>
      <CardContent className="w-full mt-6 ">
        <div className="w-full">
          <CardTitle className="text-2xl">Current Balance</CardTitle>
          <CardDescription>
            Corporate Credit Card Limit: $10,000
          </CardDescription>
        </div>
        <div className="flex w-full mt-5 space-x-5">
          <Label className="grid text-md font-bold space-x-1">
            <span>Current Balance:</span>
            <CountUp
              decimals={2}
              decimal="."
              prefix="$"
              end={currentBalance}
              duration={1}
            />
          </Label>
          <Label className="grid text-md font-bold space-x-1">
            <span>Remaining Balance:</span>
            <CountUp
              decimals={2}
              decimal="."
              prefix="$"
              end={remainingBalance}
              duration={1}
            />
          </Label>
        </div>
        <div className="mt-2">
          <Label className="grid text-md font-bold space-x-1">
            Status: Good
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
