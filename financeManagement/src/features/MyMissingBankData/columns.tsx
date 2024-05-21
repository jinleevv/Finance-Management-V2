import { ColumnDef } from "@tanstack/react-table";
import { StatusBankTransactionsData } from "@/hooks";

export const StatusBankColumns: ColumnDef<StatusBankTransactionsData>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
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
