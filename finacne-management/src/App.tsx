import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useHooks } from "@/hooks";
import { HomePage } from "./pages/HomePage";
import { TransactionHistoryPage } from "@/pages/TransactionHistoryPage";
import { UploadTransactions } from "@/pages/UploadTransactions";
import { IntroductionPage } from "@/pages/IntroductionPage";
import { LoginPage } from "@/pages/LoginPage";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  const {
    loggedInUser,
    clientI,
    clientII,
    currentPage,
    calenderDate,
    setStatusBankTableData,
    setLoggedInUser,
    setUserFirstName,
    setUserLastName,
    setUserFullName,
    setUserEmail,
    setUserDepartment,
  } = useHooks();

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!loggedInUser) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  useEffect(() => {
    clientI
      .post("/api/status-bank-transactions/", {
        date_from: calenderDate.from.toISOString().split("T")[0],
        date_to: calenderDate.to.toISOString().split("T")[0],
      })
      .then((res) => {
        setStatusBankTableData(res.data.data);
      });
  }, [currentPage]);

  useEffect(() => {
    clientII
      .get("/api/sessionid-exist/")
      .then((res) => {
        if (res.status === 204) {
          toast(
            "Please log in to the website. Either your session is expired or you are not logged in",
            { id: 1 }
          );
          setLoggedInUser(false);
        } else {
          clientII
            .get("/api/user/")
            .then((res) => {
              const first_name = res.data.user.first_name;
              const last_name = res.data.user.last_name;
              setUserFirstName(first_name);
              setUserLastName(last_name);
              setUserFullName(first_name + " " + last_name);
              setUserEmail(res.data.user.email);
              setUserDepartment(res.data.user.department);
              setLoggedInUser(true);
            })
            .catch(() => {
              setLoggedInUser(false);
            });
        }
      })
      .catch(() => {
        setLoggedInUser(false);
        toast("Something went wrong", { id: 1 });
      });
  }, [currentPage]);

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<IntroductionPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/transaction-history"
            element={
              <ProtectedRoute>
                <TransactionHistoryPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/upload-transactions"
            element={
              <ProtectedRoute>
                <UploadTransactions />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
