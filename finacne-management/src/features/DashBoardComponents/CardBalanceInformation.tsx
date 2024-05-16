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

export function CardBalanceInformation() {
  const { clientI, userDepartment, balanceStatus, setBalanceStatus } =
    useHooks();

  const DepartmentBalance = {
    president: 10000,
    finance: 10000,
    hr_general_affairs: 10000,
    marketing: 10000,
    IT_security: 10000,
    procurement: 10000,
    contruction_operation: 10000,
    Admin: 10000,
  };

  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(10000);
  let departmentBalance: number = 0;

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
      if (res.data[userDepartment] !== currentBalance) {
        setRemainingBalance(amount);
        setCurrentBalance(res.data[userDepartment]);
      }
    });
  }, []);

  useEffect(() => {
    if (userDepartment === "President") {
      departmentBalance = DepartmentBalance.president;
    } else if (userDepartment === "Procurement") {
      departmentBalance = DepartmentBalance.procurement;
    } else if (userDepartment === "Contruction Operation") {
      departmentBalance = DepartmentBalance.contruction_operation;
    } else if (userDepartment === "IT Security") {
      departmentBalance = DepartmentBalance.IT_security;
    } else if (userDepartment === "Finance") {
      departmentBalance = DepartmentBalance.finance;
    } else if (userDepartment === "HR General Affairs") {
      departmentBalance = DepartmentBalance.hr_general_affairs;
    } else if (userDepartment === "Marketing") {
      departmentBalance = DepartmentBalance.marketing;
    }

    if (currentBalance >= departmentBalance * 0.5) {
      setBalanceStatus("Bad");
    } else {
      console.log(currentBalance);
      setBalanceStatus("Good");
    }
  }, [currentBalance]);

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
            Corporate Credit Card Limit: {formatAmount(10000)}
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
            <CountUp
              decimals={2}
              decimal="."
              prefix="$"
              end={remainingBalance}
              duration={1}
            />
          </Label>
        </div>
        <div className="mt-5">
          <Label className="flex text-md font-bold">
            Status:{" "}
            <div className="ml-2 -mt-0.5">
              <StatusBadge status={balanceStatus} />
            </div>
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
