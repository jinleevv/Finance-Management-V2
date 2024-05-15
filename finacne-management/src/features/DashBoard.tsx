import { Label } from "@/components/ui/label";
import { CardBalanceInformation } from "@/features/DashBoardComponents/CardBalanceInformation";
import { RecentBankTransactions } from "./DashBoardComponents/RecentBankTransactions";
import { Button } from "@/components/ui/button";
import { useHooks } from "@/hooks";
import { useNavigate } from "react-router-dom";

export function DashBoard() {
  const { userFullName, setCurrentPage } = useHooks();
  const navigate = useNavigate();

  function handleViewAll() {
    setCurrentPage("/transaction-history");
    navigate("/transaction-history");
  }
  return (
    <div className="w-full h-screen">
      <div className="grid w-full mt-12 pl-10 pr-10">
        <Label className="text-3xl">
          Welcome, <span>{userFullName}</span>
        </Label>
        <Label className="mb-2">
          Access & manage your account and transactions efficiently.
        </Label>
        <CardBalanceInformation />
      </div>
      <div className="h-[450px] ml-10 mt-12 mr-10">
        <div className="flex justify-between">
          <Label className="text-2xl">Recent transactions</Label>
          <Button variant="outline" onClick={handleViewAll}>
            View All
          </Button>
        </div>
        <RecentBankTransactions />
      </div>
    </div>
  );
}
