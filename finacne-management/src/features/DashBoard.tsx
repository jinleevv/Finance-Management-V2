import { Label } from "@/components/ui/label";
import { CardBalanceInformation } from "@/features/DashBoardComponents/CardBalanceInformation";
import { RecentBankTransactions } from "./DashBoardComponents/RecentBankTransactions";
import { Button } from "@/components/ui/button";

export function DashBoard() {
  return (
    <div className="w-full">
      <div className="grid ml-10 mt-12 mr-10">
        <Label className="text-3xl">
          Welcome, <span>Jinwon Lee</span>
        </Label>
        <Label className="mb-2">
          Access & manage your account and transactions efficiently.
        </Label>
        <CardBalanceInformation />
      </div>
      <div className="grid ml-10 mt-12 mr-10">
        <div className="flex justify-between">
          <Label className="text-2xl">Recent transactions</Label>
          <Button variant="outline">View All</Button>
        </div>
        <RecentBankTransactions />
      </div>
    </div>
  );
}
