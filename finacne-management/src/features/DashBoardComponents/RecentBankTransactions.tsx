import { BankDataTable } from "../BankDataTable/data-table";
import { columns } from "../BankDataTable/columns";

export function RecentBankTransactions() {
  const data = getData();

  function getData() {
    // Fetch data from your API here.
    return [
      {
        trans_date: new Date(),
        post_date: new Date(),
        billing_amount: 100,
        merchant_name: "Jin",
      },
    ];
  }

  return (
    <section className="flex w-full flex-col gap-6">
      <BankDataTable columns={columns} data={data} />
    </section>
  );
}
