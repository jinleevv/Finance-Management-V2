import { DashBoard } from "@/features/DashBoard";
import { SideBar } from "@/features/SideBar";

export function HomePage() {
  return (
    <section className="flex h-screen">
      <SideBar />
      <DashBoard />
    </section>
  );
}
