import { BackgroundAnimation } from "@/features/BackgroundAnimation";
import { LoginCard } from "@/features/LoginCard";
import { useHooks } from "@/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { loggedInUser } = useHooks();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  });
  
  return (
    <div className="flex">
      <LoginCard />
      <BackgroundAnimation />
    </div>
  );
}
