import { DownloadTransaction } from "@/features/Finance Department/DownloadTransactions";
import { LeftSideBar } from "@/features/LeftSideBar";
import { MobileNav } from "@/features/MobileNav";
import { RightSideBar } from "@/features/RightSideBar";
import { useHooks } from "@/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function DownloadTransactionsPage() {
  const { setCurrentPage } = useHooks();
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <MobileNav />
      <div className="flex">
        <LeftSideBar />
        <DownloadTransaction />
        <RightSideBar />
      </div>
    </>
  );
}
