import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useHooks } from "@/hooks";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(8, { message: "Invalid password" }),
});

export function LoginCard() {
  const navigate = useNavigate();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const {
    clientI,
    clientII,
    userFirstName,
    userLastName,
    setLoggedInUser,
    calenderDate,
    setStatusBankTableData,
  } = useHooks();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await clientII
        .post(
          "/api/login/",
          { email: values.email, password: values.password },
          { withCredentials: true }
        )
        .then(() => {
          setInvalidLogin(false);
          setLoggedInUser(true);
        })
        .catch(() => {
          setInvalidLogin(true);
        });
      await clientI
        .post("/api/status-bank-transactions/", {
          date_from: calenderDate.from.toISOString().split("T")[0],
          date_to: calenderDate.to.toISOString().split("T")[0],
          first_name: userFirstName,
          last_name: userLastName,
        })
        .then((res) => {
          setStatusBankTableData(res.data.data);
          navigate("/home");
        });
    } catch (error) {
      if (error.response.data["reason"] === "Non existing user") {
        setInvalidLogin(true);
      }
    }
  }

  return (
    <Card className="lg:w-1/2 sm:w-full h-svh rounded-r-3xl">
      <CardHeader className="lg:mt-40">
        <CardTitle>Login</CardTitle>
        <CardDescription>Ulitum CAM finance management account</CardDescription>
        {invalidLogin && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Email and password does not match or not in the system! <br />
              Please try again
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ultium CAM Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Ultium CAM Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Finance Management Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
