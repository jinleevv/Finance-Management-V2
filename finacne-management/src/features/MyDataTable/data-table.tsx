import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { format, startOfMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useHooks } from "@/hooks";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { EditTransactionInformation } from "@/features/EditTransactionInformation";
import { CategoryBadge } from "@/features/CategoryBadge";

interface DataTableProps<TData1, TData2, TValue> {
  columns1: ColumnDef<TData1, TValue>[];
  data1: TData1[];
  columns2: ColumnDef<TData2, TValue>[];
  data2: TData2[];
}

export function MyDataTable<TData1, TData2, TValue>({
  columns1,
  data1,
  columns2,
  data2,
}: DataTableProps<TData1, TData2, TValue>) {
  const {
    clientI,
    clientII,
    userFirstName,
    userLastName,
    calenderDate,
    setStatusBankTableData,
    setCalenderDate,
    setMyTableData,
  } = useHooks();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [myTabSelected, setMyTabSelected] = useState<boolean>(true);
  const [bankTabSelected, setBankTabSelected] = useState<boolean>(false);

  useEffect(() => {
    setDate({
      from: calenderDate.from,
      to: calenderDate.to,
    });
  }, [calenderDate]);

  const table = useReactTable({
    data: data1,
    columns: columns1,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  });

  const StatusBankTable = useReactTable({
    data: data2,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  });

  function handleTabChange(value: string) {
    if (value === "My_Transactions") {
      setMyTabSelected(true);
      setBankTabSelected(false);
    } else {
      setMyTabSelected(false);
      setBankTabSelected(true);
    }
  }

  function preHandleDelete() {
    const data = table.getFilteredSelectedRowModel().rows;

    if (data.length === 0) {
      toast("Unable to delete the data, please only select at least one item");
    }
  }

  async function handleDelete() {
    const data = table.getFilteredSelectedRowModel().rows;

    await clientI
      .post("/api/delete-card-data/", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        clientII
          .get("/api/card-transaction-history/", {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            setMyTableData(res.data);
          })
          .catch(() => {
            toast("Unable to reload the card transaction history");
          });
      })
      .catch(() => toast("Unable to delete the data"));
  }

  async function handleFilterByDates() {
    const data = JSON.stringify({
      date_from: date.from.toISOString().split("T")[0],
      date_to: date.to.toISOString().split("T")[0],
      first_name: userFirstName,
      last_name: userLastName,
    });

    await clientI
      .post("/api/filter-by-dates/", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setMyTableData(res.data);
      })
      .catch(() => {
        toast("Unable to filter by given dates");
      });

    await clientI
      .post("/api/status-bank-transactions/", {
        date_from: date.from.toISOString().split("T")[0],
        date_to: date.to.toISOString().split("T")[0],
      })
      .then((res) => {
        setStatusBankTableData(res.data.data);
      })
      .catch(() => {
        toast("Unable to filter by given dates");
      });

    setCalenderDate({
      from: date.from,
      to: date.to,
    });
  }

  function handleEditError() {
    toast("Please only select one item");
  }

  async function handleDownloadImage() {
    const data = table.getFilteredSelectedRowModel().rows;

    if (data.length < 1) {
      toast("Please select at least one data to download image(s)");
    } else {
      const todayDate = new Date();
      const todayDateString = todayDate.toISOString().split("T")[0];
      const filenames = data.map((element: any) => element.original["img"]);

      try {
        const response = await clientI
          .post(
            "/api/receipt-download/",
            {
              filenames: filenames,
            },
            { responseType: "blob" }
          )
          .catch(() => {
            toast("Error downloading images:");
          });

        const blob = new Blob([response.data], { type: "application/zip" });
        saveAs(blob, `images_${todayDateString}.zip`);
      } catch (error) {
        console.log(error);
        toast("Error downloading images");
      }
    }
  }

  return (
    <div className="rounded-md h-full overflow-auto">
      <Tabs defaultValue="My_Transactions" onValueChange={handleTabChange}>
        <div className="flex gap-1 mt-8 mb-4 justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleFilterByDates}>Search</Button>
        </div>
        <TabsList className="custom-scrollbar mb-8 flex w-full flex-nowrap bg-white justify-between">
          <div className="space-x-3">
            <TabsTrigger
              value="My_Transactions"
              className="bg-white shadow-none border-0 p-0 justify-start items-start data-[state=active]:shadow-none"
            >
              <div
                className={cn(`gap-[18px] border-b-2 flex transition-all`, {
                  "border-black": myTabSelected,
                })}
              >
                <p
                  className={cn(
                    `text-16 line-clamp-1 flex-1 font-medium text-black`,
                    {
                      "text-black": myTabSelected,
                    }
                  )}
                >
                  My Upload History
                </p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="Bank_Transactions"
              className="bg-white shadow-none border-0 p-0 justify-start items-start data-[state=active]:shadow-none"
            >
              <div
                className={cn(`gap-[18px] border-b-2 flex transition-all`, {
                  "border-black": bankTabSelected,
                })}
              >
                <p
                  className={cn(
                    `text-16 line-clamp-1 flex-1 font-medium text-black`,
                    {
                      "text-black": bankTabSelected,
                    }
                  )}
                >
                  Official Bank Transactions
                </p>
              </div>
            </TabsTrigger>
          </div>

          {myTabSelected ? (
            <div className="flex space-x-1">
              <Button variant="outline" onClick={handleDownloadImage}>
                Download Images
              </Button>
              {table.getFilteredSelectedRowModel().rows.length === 1 ? (
                <EditTransactionInformation
                  data={table.getFilteredSelectedRowModel().rows}
                />
              ) : (
                <Button onClick={handleEditError} variant="outline">
                  Edit
                </Button>
              )}
              {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Delete</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] rounded-xl">
                    <DialogHeader>
                      <DialogTitle>Delete</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete? You cannot undo the
                        action.
                      </DialogDescription>
                    </DialogHeader>{" "}
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Alert</AlertTitle>
                      <AlertDescription>
                        Are you sure you want to delete? You cannot undo the
                        action.
                      </AlertDescription>
                    </Alert>
                    <DialogFooter>
                      <Button onClick={handleDelete}>Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button variant="outline" onClick={preHandleDelete}>
                  Delete
                </Button>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </TabsList>
        <TabsContent value="My_Transactions">
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns1.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="Bank_Transactions">
          <Table>
            <TableHeader>
              {StatusBankTable.getHeaderGroups().map((headerGroup) => (
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
              {StatusBankTable.getRowModel().rows?.length ? (
                StatusBankTable.getRowModel().rows.map((row) => (
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
                    colSpan={columns2.length}
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
