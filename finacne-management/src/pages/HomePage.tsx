import { DashBoard } from "@/features/DashBoard";
import { RightSideBar } from "@/features/RightSideBar";
import { LeftSideBar } from "@/features/LeftSideBar";
import { MobileNav } from "@/features/MobileNav";

export function HomePage() {
  return (
    <>
      <MobileNav />
      <section className="flex h-screen">
        <LeftSideBar />
        <DashBoard />
        <RightSideBar />
      </section>
    </>
  );
}
