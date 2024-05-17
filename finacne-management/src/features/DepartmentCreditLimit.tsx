import { Label } from "@/components/ui/label";
import { useHooks } from "@/hooks";

export function DepartmentCreditLimit() {
  const { departmentCreditCardInfo } = useHooks();
  return (
    <section className="w-full">
      <div className="mt-12 ml-10 mr-10">
        <Label className="grid text-2xl font-bold">
          Set Credit Card Limit for Each Department
        </Label>
        <Label className="ml-1">Set Credit Card Limit</Label>
      </div>
      <div className="mt-12 ml-10 mr-10 p-3 border rounded-lg">
        <Label className="grid text-xl font-bold">Current Status</Label>
        <div className="grid grid-cols-2">
          {departmentCreditCardInfo.map((item) => {
            return (
              <div>
                <Label>{item.department}</Label>
                <Label>{item.limit}</Label>
                <Label>{item.usage}</Label>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
