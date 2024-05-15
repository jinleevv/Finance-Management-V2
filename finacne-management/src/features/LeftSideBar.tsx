import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useHooks } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Footer } from "@/features/Footer";
import { LuBanknote, LuDownload, LuHistory } from "react-icons/lu";

export function LeftSideBar() {
  const {
    clientI,
    calenderDate,
    currentPage,
    userFirstName,
    userLastName,
    userDepartment,
    setEntireBankTableDate,
    setMyTableData,
    setCurrentPage,
  } = useHooks();
  const navigate = useNavigate();

  function handleHomeNavigate() {
    setCurrentPage("/home");
    navigate("/home");
  }

  async function handleHistoryNavigate() {
    await clientI
      .post("/api/card-transaction-history/", {
        date_from: calenderDate.from.toISOString().split("T")[0],
        date_to: calenderDate.to.toISOString().split("T")[0],
        first_name: userFirstName,
        last_name: userLastName,
      })
      .then((res) => {
        setMyTableData(res.data);
      })
      .catch(() => {
        toast("Unable to update the table");
      });
    setCurrentPage("/transaction-history");
    navigate("/transaction-history");
  }

  function handleUploadNavigate() {
    setCurrentPage("/upload-transactions");
    navigate("/upload-transactions");
  }

  function handleUploadBankTransactionNavigate() {
    setCurrentPage("/upload-bank-transactions");
    navigate("/upload-bank-transactions");
  }

  function handleDownloadTransactionsNavigate() {
    setCurrentPage("/download-transactions");
    navigate("/download-transactions");
  }

  async function handleBankTransactionHistoryNavigate() {
    await clientI
      .get("/api/upload-bank-transaction-list/")
      .then((res) => {
        setEntireBankTableDate(res.data);
        setCurrentPage("/bank-transaction-history");
        navigate("/bank-transaction-history");
      })
      .catch(() => toast("Error: Cannot load the page"));
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
        {userDepartment === "Finance" || "Admin" ? (
          <div className="mt-5">
            <div className="ml-2 mr-2 border-t"></div>
            <div className="mt-6 pl-2 pr-2 space-y-2">
              {currentPage === "/upload-bank-transactions" ? (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  onClick={handleUploadBankTransactionNavigate}
                >
                  <LuBanknote size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Upload Bank Transactions
                  </span>
                </Button>
              ) : (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  variant="ghost"
                  onClick={handleUploadBankTransactionNavigate}
                >
                  <LuBanknote size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Upload Bank Transactions
                  </span>
                </Button>
              )}
              {currentPage === "/download-transactions" ? (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  onClick={handleDownloadTransactionsNavigate}
                >
                  <LuDownload size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Download Transactions
                  </span>
                </Button>
              ) : (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  variant="ghost"
                  onClick={handleDownloadTransactionsNavigate}
                >
                  <LuDownload size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Download Transactions
                  </span>
                </Button>
              )}
              {currentPage === "/bank-transactions-history" ? (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  onClick={handleBankTransactionHistoryNavigate}
                >
                  <LuHistory size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Bank Transaction History
                  </span>
                </Button>
              ) : (
                <Button
                  className="flex w-full h-12 text-left gap-2 overflow-auto"
                  variant="ghost"
                  onClick={handleBankTransactionHistoryNavigate}
                >
                  <LuHistory size={25} />
                  <span className="w-full font-semibold text-black-2 max-xl:hidden">
                    Bank Transaction History
                  </span>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>

      <Footer />
    </section>
  );
}
