import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";

export function RecentBankTransactions() {
  return (
    <section className="flex w-full flex-col gap-6">
      <Tabs className="w-full" defaultValue="Bank_Transactions">
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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </section>
  );
}
