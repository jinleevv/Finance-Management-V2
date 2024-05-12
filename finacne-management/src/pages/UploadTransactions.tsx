import { LeftSideBar } from "@/features/LeftSideBar";
import { MobileNav } from "@/features/MobileNav";
import { RightSideBar } from "@/features/RightSideBar";

export function UploadTransactions() {
  return (
    <>
      <MobileNav />
      <div className="flex">
        <LeftSideBar />
        <RightSideBar />
      </div>
    </>
  );
}
