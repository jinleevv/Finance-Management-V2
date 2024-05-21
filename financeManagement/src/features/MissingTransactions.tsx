import { Label } from "@/components/ui/label";
import { MyMissingUploadedData } from "@/features/MyMissingUploadedData/data-table";
import { columns as UploadedColumns } from "./MyMissingUploadedData/columns";
import { StatusBankColumns } from "./MyMissingBankData/columns";
import { useHooks } from "@/hooks";
import { MyMissingBankData } from "./MyMissingBankData/data-table";

export function MissingTransactions() {
  const { myMissingUploadedData, myMissingBankData } = useHooks();
  return (
    <section className="w-full">
      <div className="mt-12 ml-10 mr-10">
        <Label className="grid text-2xl font-bold">Missing Transactions</Label>
        <Label className="ml-1">Compare Transactions</Label>
      </div>
      <div className="flex w-full mt-12 gap-3 h-2/5 overflow-auto">
        <div className="w-1/2 h-full ml-3">
          <Label>Remaining Items (Your List)</Label>
          <MyMissingUploadedData
            columns={UploadedColumns}
            data={myMissingUploadedData}
          />
        </div>
        <div className="w-1/2 h-full">
          <Label>Remaining Items (Bank List)</Label>
          <MyMissingBankData
            columns={StatusBankColumns}
            data={myMissingBankData}
          />
        </div>
      </div>
      <div className="w-full ml-3 mt-3">
        <Label>Matched Items</Label>
      </div>
      <MyMissingBankData columns={StatusBankColumns} data={myMissingBankData} />
    </section>
  );
}
