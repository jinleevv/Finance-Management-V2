import { RightSideBar } from "@/features/RightSideBar";
import { LeftSideBar } from "@/features/LeftSideBar";
import { MobileNav } from "@/features/MobileNav";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useHooks } from "@/hooks";
import { CreateAccount } from "@/features/CreateAccount";

export function CreateAccountPage() {
  const { setCurrentPage } = useHooks();
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, []);

  return (
    <>
      <MobileNav />
      <section className="flex w-full h-screen">
        <LeftSideBar width="w-4/12"/>
        <CreateAccount />
        <RightSideBar />
      </section>
    </>
  );
}
