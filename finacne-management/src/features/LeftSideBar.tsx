import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useHooks } from "@/hooks";
import { startOfMonth } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LeftSideBar() {
  const {
    clientII,
    currentPage,
    setMyTableData,
    setCalenderDate,
    setCurrentPage,
  } = useHooks();
  const navigate = useNavigate();

  function handleHomeNavigate() {
    setCurrentPage("Home");
    navigate("/home");
  }

  async function handleHistoryNavigate() {
    await clientII
      .get("/api/card-transaction-history/")
      .then((res) => {
        setMyTableData(res.data);
      })
      .catch(() => {
        toast("Unable to update the table");
      });
    setCalenderDate({
      from: startOfMonth(new Date()),
      to: new Date(),
    });
    setCurrentPage("Transaction History");
    navigate("/transaction-history");
  }

  function handleUploadNavigate() {
    setCurrentPage("Upload Transactions");
    navigate("/upload-transactions");
  }

  return (
    <section className="sticky left-0 top-0 flex h-screen w-4/12 flex-col justify-between border-r border-gray-200 pt-8 max-md:hidden">
      <nav className="flex flex-col gap-4">
        <div className="grid text-center">
          <Label className="text-black text-2xl font-bold">Ultium CAM</Label>
          <Label className="text-black text-xs mb-7">
            Card Management System
          </Label>
        </div>
        <div className="w-full space-y-2 pr-2 pl-2">
          {currentPage === "/home" ? (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              onClick={handleHomeNavigate}
            >
              <img src="/src/icons/home.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Home
              </span>
            </Button>
          ) : (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              variant="ghost"
              onClick={handleHomeNavigate}
            >
              <img src="/src/icons/home.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Home
              </span>
            </Button>
          )}
          {currentPage === "/transaction-history" ? (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              onClick={handleHistoryNavigate}
            >
              <img src="/src/icons/transaction.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Transaction History
              </span>
            </Button>
          ) : (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              variant="ghost"
              onClick={handleHistoryNavigate}
            >
              <img src="/src/icons/transaction.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Transaction History
              </span>
            </Button>
          )}
          {currentPage === "/upload-transactions" ? (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              onClick={handleUploadNavigate}
            >
              <img src="/src/icons/dollar-circle.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Upload Transactions
              </span>
            </Button>
          ) : (
            <Button
              className="flex w-full h-12 text-left gap-2 overflow-auto"
              variant="ghost"
              onClick={handleUploadNavigate}
            >
              <img src="/src/icons/dollar-circle.svg" />
              <span className="w-full font-semibold text-black-2 max-xl:hidden">
                Upload Transactions
              </span>
            </Button>
          )}
        </div>
      </nav>
    </section>
  );
}
