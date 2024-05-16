import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useHooks } from "@/hooks";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export function DownloadTransaction() {
  const { clientI } = useHooks();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  async function handleClick() {
    try {
      const data = JSON.stringify({
        date_from: date.from.toISOString().split("T")[0],
        date_to: date.to.toISOString().split("T")[0],
      });

      await clientI
        .post("/api/download-transaction/", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.data.length !== 0) {
            const jsonData = res.data.data;

            const cleanedData = jsonData.map(
              ({ id, ...rest }: { id: any }) => rest
            );

            const worksheet = XLSX.utils.json_to_sheet(cleanedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            // Buffer to store the generated Excel file
            const excelBuffer = XLSX.write(workbook, {
              bookType: "xlsx",
              type: "array",
            });
            const blob = new Blob([excelBuffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            });

            const nameDate = new Date();
            const fileDownloadName =
              "Transactions_List_" +
              nameDate.toISOString().split("T")[0] +
              ".xlsx";
            saveAs(blob, fileDownloadName);
          } else {
            toast("There is no data that intersect with each other");
          }
        });
    } catch (err) {
      toast("Something went wront, please contact IT department");
    }
  }

  return (
    <section className="w-full">
      <div className="mt-12 ml-10 mr-10">
        <Label className="grid text-2xl font-bold">Download Transactions</Label>
        <Label className="ml-1">Download Total Transaction Information</Label>
      </div>
      <div className="flex w-full mt-12 pl-10 pr-10 gap-3">
        <div className="w-1/2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full h-full justify-start text-left font-normal",
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
            <PopoverContent className="w-auto" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-1/2">
          <Button onClick={handleClick} className="">
            Download
          </Button>
        </div>
      </div>
    </section>
  );
}
