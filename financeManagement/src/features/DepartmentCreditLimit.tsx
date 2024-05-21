import { Label } from "@/components/ui/label";
import { useHooks } from "@/hooks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FormSchema = z.object({
  department: z.string().min(1, "Please provide a limit"),
  limit: z.string().min(1, "Please provide a limit"),
});

export function DepartmentCreditLimit() {
  const { clientI, departmentCreditCardInfo, setDepartmentCreditCardInfo } =
    useHooks();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function formatAmount(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await clientI
      .post("/api/department-credit-card-limit/", {
        department: data.department,
        limit: data.limit,
      })
      .then(() => {
        clientI.get("/api/department-credit-card-limit/").then((res) => {
          setDepartmentCreditCardInfo(res.data);
        });
        toast("Change has been applied");
      })
      .catch(() => toast("Failed"));
  }

  return (
    <section className="w-full">
      <div className="mt-12 ml-10 mr-10">
        <Label className="grid text-2xl font-bold">
          Set Credit Card Limit for Each Department
        </Label>
        <Label className="ml-1">Set Credit Card Limit</Label>
      </div>
      <div className="mt-12 ml-10 mr-10 p-3 border rounded-lg">
        <Label className="grid text-xl font-bold">Current Status</Label>
        <div className="grid grid-cols-2">
          {departmentCreditCardInfo.map((item) => {
            return (
              <div className="flex space-x-2 mt-2">
                <div>
                  <Label className="font-bold">
                    {item.department} Department:
                  </Label>
                </div>
                <div className="space-x-2">
                  <Label>Limit: {formatAmount(item.limit)}</Label>
                  <Label>Usage: {formatAmount(item.usage)}</Label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-12 ml-10 mr-10 p-3 border rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-3">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Procurement">
                            Procurement
                          </SelectItem>
                          <SelectItem value="Contruction Operation">
                            Contruction Operation
                          </SelectItem>
                          <SelectItem value="President">President</SelectItem>
                          <SelectItem value="IT Security">
                            IT Security
                          </SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR General Affairs">
                            HR General Affairs
                          </SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="limit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full mt-3 justify-end">
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
