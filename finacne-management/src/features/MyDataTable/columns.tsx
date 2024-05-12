import { ColumnDef } from "@tanstack/react-table";
import { MyTransactionsData } from "@/hooks";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<MyTransactionsData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || "indeterminate"}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mt-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trans_date",
    header: "Trans Date",
  },
  {
    accessorKey: "billing_amount",
    header: "Amount",
  },
  {
    accessorKey: "merchant_name",
    header: "Merchant Name",
  },
  {
    accessorKey: "img",
    header: "Receipt Image",
  },
];
