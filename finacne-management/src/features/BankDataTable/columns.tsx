import { ColumnDef } from "@tanstack/react-table";
import { BankTransactionsData } from "@/hooks";

export const columns: ColumnDef<BankTransactionsData>[] = [
  {
    accessorKey: "trans_date",
    header: "Trans Date",
  },
  {
    accessorKey: "post_date",
    header: "Post Date",
  },
  {
    accessorKey: "billing_amount",
    header: "Amount",
  },
  {
    accessorKey: "merchant_name",
    header: "Merchant Name",
  },
];
