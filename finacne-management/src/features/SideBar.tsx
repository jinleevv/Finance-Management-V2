import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SideBar() {
  return (
    <Card className="h-full w-1/5 border-t-0 border-b-0">
      <CardHeader>
        <CardTitle>Ultium CAM</CardTitle>
        <CardDescription>Corporate Card Transaction System</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full text-left overflow-auto" variant="outline">
          <span className="w-full ">Home</span>
        </Button>
        <Button className="w-full">
          <span className="w-full text-left overflow-auto">
            Transaction History
          </span>
        </Button>
        <Button className="w-full">
          <span className="w-full text-left overflow-auto">
            Corporate Card Transaction Upload
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
