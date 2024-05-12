import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface CategoryBadgeProps {
  category: any;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const status: string = category;
  const categoryBadgeSuccess =
    "flex w-[90px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-success-600 bg-green-100";
  const categoryBadgeFail =
    "flex w-[105px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-red-600 bg-red-100";

  return (
    <div
      className={
        status === "Matched" ? categoryBadgeSuccess : categoryBadgeFail
      }
    >
      <div
        className={
          status === "Matched"
            ? "size-2 rounded-full bg-green-600"
            : "size-2 rounded-full bg-red-600"
        }
      >
        <span
          className={
            status === "Matched"
              ? "flex w-full ml-3 -mt-1.5 text-[12px] font-medium text-success-700"
              : "flex w-full ml-3 -mt-1.5 text-[12px] font-medium text-red-700"
          }
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export function BankDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md h-full">
      <Tabs defaultValue="Bank_Transactions">
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap bg-white justify-start">
          <TabsTrigger
            value="Bank_Transactions"
            className="bg-white shadow-none border-0 p-0 justify-start items-start data-[state=active]:shadow-none"
          >
            <div
              className={cn(`gap-[18px] border-b-2 flex transition-all`, {
                "border-black": true,
              })}
            >
              <p
                className={cn(
                  `text-16 line-clamp-1 flex-1 font-medium text-black`,
                  {
                    "text-black": true,
                  }
                )}
              >
                Official Bank Transactions
              </p>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Bank_Transactions">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.id.split("_")[1] === "status" ? (
                          <CategoryBadge category={cell.getValue()} />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
