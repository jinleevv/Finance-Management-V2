import { BankDataTable } from "../StatusBankDataTable/data-table";
import { StatusBankColumns } from "../StatusBankDataTable/columns";
import { useHooks } from "@/hooks";
import { useEffect } from "react";

export function RecentBankTransactions() {
  const {
    clientI,
    currentPage,
    calenderDate,
    statusBankTableData,
    setStatusBankTableData,
  } = useHooks();

  useEffect(() => {
    console.log(statusBankTableData);
    clientI
      .post("/api/status-bank-transactions/", {
        date_from: calenderDate.from.toISOString().split("T")[0],
        date_to: calenderDate.to.toISOString().split("T")[0],
      })
      .then((res) => {
        setStatusBankTableData(res.data.data);
      });
  }, [currentPage]);

  return (
    <section className="flex w-full h-full flex-col gap-6 overflow-hidden">
      <BankDataTable columns={StatusBankColumns} data={statusBankTableData} />
    </section>
  );
}
