import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useHooks } from "@/hooks";
import { HomePage } from "./pages/HomePage";
import { TransactionHistory } from "@/pages/TransactionHistory";
import { UploadTransactions } from "@/pages/UploadTransactions";
import { IntroductionPage } from "@/pages/IntroductionPage";
import { LoginPage } from "@/pages/LoginPage";
import { Toaster } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<IntroductionPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route
            path="/transaction-history"
            element={<TransactionHistory />}
          ></Route>
          <Route
            path="/upload-transactions"
            element={<UploadTransactions />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
