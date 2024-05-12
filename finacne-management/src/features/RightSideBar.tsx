import { Label } from "@/components/ui/label";
import { BankCard } from "./BankCard";
import { useHooks } from "@/hooks";

export function RightSideBar() {
  const { userFullName, userEmail } = useHooks();

  return (
    <aside className="no-scrollbar hidden h-screen max-h-screen w-4/12 flex-col border-l border-gray-200 xl:flex xl:overflow-y-scroll !important">
      <section className="flex flex-col pb-8">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat">
          <div className="relative flex px-6 max-xl:justify-center">
            <div className="flex-center absolute top-16 size-24 rounded-full bg-gray-100 border-8 border-white p-4 shadow-profile">
              <span className="text-5xl font-bold text-black m-2.5">J</span>
            </div>
            <div className="flex flex-col pt-44">
              <Label className="text-3xl font-bold">{userFullName}</Label>
              <Label className="ml-1 text-xs text-gray-600">{userEmail}</Label>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-28">
        <Label className="ml-3 text-2xl font-bold">My Card </Label>
        <BankCard />
      </section>
    </aside>
  );
}
