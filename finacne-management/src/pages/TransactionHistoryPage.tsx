import { LeftSideBar } from "@/features/LeftSideBar";
import { MobileNav } from "@/features/MobileNav";
import { RightSideBar } from "@/features/RightSideBar";
import { TransactionHistory } from "@/features/TransactionHistory";

export function TransactionHistoryPage() {
  return (
    <>
      <MobileNav />
      <div className="flex">
        <LeftSideBar />
        <TransactionHistory />
        <RightSideBar />
      </div>
    </>
  );
}
