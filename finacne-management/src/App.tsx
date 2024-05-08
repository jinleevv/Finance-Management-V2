import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useHooks } from "@/hooks";
import { HomePage } from "./pages/HomePage";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function App() {
  const { logedInUser } = useHooks();

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!logedInUser) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
