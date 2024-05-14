import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CategoryBadgeProps {
  category: any;
  rowData: any;
}

const formSchema = z.object({
  category: z.string().min(1, { message: "It is required" }),
  billing_amount: z.string().min(1, { message: "It is required" }),
  tps: z.string().min(1, { message: "It is required" }),
  tvq: z.string().min(1, { message: "It is required" }),
  purpose: z.string().min(1, { message: "It is required" }),
  project: z.string().min(1, { message: "It is required" }),
  attendees: z.string().min(1, { message: "It is required" }),
  file: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
});

export function CategoryBadge({ category, rowData }: CategoryBadgeProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register("file");
  const [checked, setChecked] = useState(false);
  const [submitValuesElement, setSubmitValuesElement] = useState(<div></div>);

  const row_contents = {
    status: rowData.getAllCells()[0].row.original["status"],
    trans_date: rowData.getAllCells()[0].row.original["trans_date"],
    post_date: rowData.getAllCells()[0].row.original["post_date"],
    amount: rowData.getAllCells()[0].row.original["billing_amount"],
    merchant_name: rowData.getAllCells()[0].row.original["merchant_name"],
  };

  const status: string = category;
  const categoryBadgeSuccess =
    "flex w-[90px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-success-600 bg-green-100";
  const categoryBadgeFail =
    "flex w-[105px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-red-600 bg-red-100";

  function handleStartMatchFromStatus() {
    form.setValue("billing_amount", row_contents.amount.toString());
  }

  function handleFormValues() {
    const values = form.getValues();
    const submitValues = `Billing Amount: ${values.billing_amount}, TPS: ${values.tps}, TVQ: ${values.tvq}`;
    const valuesRender = submitValues.split("\n").map((line, index) => (
      <Fragment key={index}>
        {line} <br />
      </Fragment>
    ));
    setSubmitValuesElement(<div>{valuesRender}</div>);
  }

  function handleCheckBox() {
    if (checked) {
      form.setValue("tvq", "");
      form.setValue("tps", "");
      setChecked(false);
    } else {
      const billingAmount = parseFloat(form.getValues().billing_amount);
      const taxableAmount = billingAmount / 1.14975;
      const tvqValue = (taxableAmount * 0.09975).toFixed(2).toString();
      const tpsValue = (taxableAmount * 0.05).toFixed(2).toString();
      form.setValue("tvq", tvqValue);
      form.setValue("tps", tpsValue);
      setChecked(true);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger onClick={handleStartMatchFromStatus}>
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
      </DialogTrigger>
      <DialogContent className="max-w-[820px]">
        {status === "Matched" ? (
          <DialogHeader>
            <DialogTitle>It is already matched!</DialogTitle>
            <DialogDescription>
              This item is already matched! No need to re-upload.
            </DialogDescription>
          </DialogHeader>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>It is not matched yet!</DialogTitle>
              <DialogDescription>
                Directly upload the information to match the transaction.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="grid w-full">
                <div>
                  <Label htmlFor="image_file">Image File</Label>
                  <FormField
                    control={form.control}
                    name="file"
                    render={({}) => (
                      <FormItem>
                        <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                        <FormControl>
                          <Input
                            className="w-full sm:w-full xsm:w-full"
                            id="file"
                            type="file"
                            {...fileRef}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex mt-7 gap-3">
                  <div className="w-1/2 space-y-2">
                    <div className="flex gap-3">
                      <Label htmlFor="amount">Billing Amount</Label>
                      <div className="flex items-center space-x-1">
                        <Checkbox
                          id="terms"
                          checked={checked}
                          onCheckedChange={handleCheckBox}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Auto tax
                        </label>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="billing_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                          <FormControl>
                            <Input
                              id="amount"
                              placeholder="Amount"
                              className="w-full"
                              {...field}
                              disabled
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-1/2 gap-3">
                    <div className="flex w-full gap-3">
                      <div className="grid w-full space-y-3">
                        <Label htmlFor="amount">TPS(GST)</Label>
                        <FormField
                          control={form.control}
                          name="tps"
                          render={({ field }) => (
                            <FormItem>
                              <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                              <FormControl>
                                <Input
                                  id="amount"
                                  placeholder="Amount"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid w-full space-y-3">
                        <Label htmlFor="amount">TVQ(QST)</Label>
                        <FormField
                          control={form.control}
                          name="tvq"
                          render={({ field }) => (
                            <FormItem>
                              <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                              <FormControl>
                                <Input
                                  id="amount"
                                  placeholder="Amount"
                                  className="w-full"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 gap-3">
                  <div className="w-1/2">
                    <Label htmlFor="category">Category</Label>
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="w-full h-full justify-start overflow-hidden"
                              >
                                <Button variant="outline">
                                  {field.value ? (
                                    field.value
                                  ) : (
                                    <span>Choose a category</span>
                                  )}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full h-full break-all">
                                <DropdownMenuLabel>
                                  Choose a category
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <DropdownMenuRadioItem value="Business Trip(Hotel,Food,Gas,Parking,Toll,Trasportation)">
                                    Business Trip
                                    (Hotel,Food,Gas,Parking,Toll,Trasportation)
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Meeting with Business Partners">
                                    Meeting with Business Partners
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Meeting between employees">
                                    Meeting between employees
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Business Conference, Seminar, Workshop">
                                    Business Conference, Seminar, Workshop
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Banking Fees">
                                    Banking Fees
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Car Expenses (Gas, Maintenance, Parking, Toll)">
                                    Car Expenses (Gas, Maintenance, Parking,
                                    Toll)
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="Others(Ask Finance Department)">
                                    Others (Ask Finance Department)
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="project">Project</Label>
                    <FormField
                      control={form.control}
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                          <FormControl>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="w-full h-full overflow-hidden"
                              >
                                <Button variant="outline">
                                  {field.value ? (
                                    field.value
                                  ) : (
                                    <span>Choose a project</span>
                                  )}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-full h-full break-all">
                                <DropdownMenuLabel>
                                  Choose a project
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="w-full text-center"
                                >
                                  <DropdownMenuRadioItem value="CAM1">
                                    CAM1
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="CAM2">
                                    CAM2
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="PCAM">
                                    PCAM
                                  </DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="N/A">
                                    N/A
                                  </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex mt-5 gap-3">
                  <div className="w-1/2">
                    <Label htmlFor="purpose">Purpose of Payment</Label>
                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide the specific purpose of payment"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="attendees">Attendees</Label>
                    <FormField
                      control={form.control}
                      name="attendees"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage className="-mt-2 text-[13.5px]"></FormMessage>
                          <FormControl>
                            <Textarea
                              placeholder="Attendees"
                              className="w-[386px] sm:w-full xsm:w-full"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-7 flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={handleFormValues}>Submit</Button>
                    </DialogTrigger>
                    <DialogContent className="w-full rounded-lg">
                      <DialogHeader>
                        <DialogTitle>
                          Corporate Card Transaction Form
                        </DialogTitle>
                        <DialogDescription>
                          Submit the transaction form
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Alert variant="destructive">
                          <ExclamationTriangleIcon className="h-4 w-4" />
                          <AlertTitle>
                            Please review before submitting
                          </AlertTitle>
                          <AlertDescription>
                            {submitValuesElement}
                          </AlertDescription>
                        </Alert>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button onClick={() => form.handleSubmit(onSubmit)()}>
                            Continue
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
