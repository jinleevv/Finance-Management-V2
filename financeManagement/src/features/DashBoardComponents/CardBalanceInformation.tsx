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
import { StatusBadge } from "./StatusBadge";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from "date-fns";

export function CardBalanceInformation() {
  const {
    clientI,
    calenderDate,
    userFirstName,
    userLastName,
    userDepartment,
    balanceStatus,
    setBalanceStatus,
  } = useHooks();

  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  useEffect(() => {
    clientI
      .post("/api/department-credit-balance/", {
        date_from: date.from.toISOString().split("T")[0],
        date_to: date.to.toISOString().split("T")[0],
      })
      .then(() => {
        // clientI.get("/api/department-credit-card-limit/").then((res) => {
        //   res.data.map((item) => {
        //     if (item.department === userDepartment) {
        //       setCurrentBalance(item.usage);
        //       setRemainingBalance(item.limit - item.usage);
        //       // if (currentBalance >= item.limit - item.usage) {
        //       //   setBalanceStatus("Bad");
        //       // } else {
        //       //   setBalanceStatus("Good");
        //       // }
        //     }
        //   });
        // });
        clientI
          .post("/api/user-credit-card-limit/", {
            date_from: calenderDate.from.toISOString().split("T")[0],
            date_to: calenderDate.to.toISOString().split("T")[0],
            first_name: userFirstName,
            last_name: userLastName,
          })
          .then((res) => {
            setCurrentBalance(res.data.total_billing_amount);
          });
      })
      .catch((err) => {});
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
            Corporate Credit Card Limit: Currently Testing
          </CardDescription>
        </div>
        <div className="flex w-full mt-5 space-x-5">
          <Label className="lg:flex grid text-md font-bold space-x-1">
            <span>Current Balance:</span>
            <CountUp
              decimals={2}
              decimal="."
              prefix="$"
              end={currentBalance}
              duration={1}
            />
          </Label>
          <Label className="lg:flex grid text-md font-bold space-x-1">
            <span>Remaining Balance:</span>
            {/* <CountUp decimals={2} decimal="." prefix="$" end={0} duration={1} /> */}
          </Label>
        </div>
        <div className="mt-5">
          <Label className="flex text-md font-bold">
            Status:{" "}
            <div className="ml-2 -mt-0.5">
              <StatusBadge status={"Good"} />
            </div>
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
