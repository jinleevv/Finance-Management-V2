import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useHooks } from "@/hooks";
import { useNavigate } from "react-router-dom";

export function MobileNav() {
  const { currentPage, setCurrentPage } = useHooks();
  const navigate = useNavigate();

  function handleHomeNavigate() {
    setCurrentPage("Home");
    navigate("/");
  }

  function handleHistoryNavigate() {
    setCurrentPage("Transaction History");
    navigate("/transaction-history");
  }

  function handleUploadNavigate() {
    setCurrentPage("Upload Transactions");
    navigate("/upload-transactions");
  }
  return (
    <section className="sticky flex w-full p-3 justify-between border-b border-gray-200 shadow-sm md:hidden">
      <Label className="text-2xl font-bold">Ultium CAM</Label>
      <Sheet>
        <SheetTrigger>
          <img
            src="/src/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <div className="mb-10">
            <Label className="text-2xl font-bold">Ultium CAM</Label>
          </div>
          <SheetClose asChild>
            <nav>
              <div className="space-y-2">
                {currentPage === "Home" ? (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      onClick={handleHomeNavigate}
                    >
                      <img src="/src/icons/home.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Home
                      </span>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      variant="ghost"
                      onClick={handleHomeNavigate}
                    >
                      <img src="/src/icons/home.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Home
                      </span>
                    </Button>
                  </SheetClose>
                )}
                {currentPage === "Transaction History" ? (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      onClick={handleHistoryNavigate}
                    >
                      <img src="/src/icons/transaction.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Transaction History
                      </span>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      variant="ghost"
                      onClick={handleHistoryNavigate}
                    >
                      <img src="/src/icons/transaction.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Transaction History
                      </span>
                    </Button>
                  </SheetClose>
                )}
                {currentPage === "Upload Transactions" ? (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      onClick={handleUploadNavigate}
                    >
                      <img src="/src/icons/dollar-circle.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Upload Transactions
                      </span>
                    </Button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild>
                    <Button
                      className="flex w-full h-16 text-left gap-2 overflow-auto"
                      variant="ghost"
                      onClick={handleUploadNavigate}
                    >
                      <img src="/src/icons/dollar-circle.svg" />
                      <span className="w-full font-semibold text-black-2">
                        Upload Transactions
                      </span>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </nav>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </section>
  );
}
