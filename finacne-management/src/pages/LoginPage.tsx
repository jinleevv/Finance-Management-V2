import { BackgroundAnimation } from "@/features/BackgroundAnimation";
import { LoginCard } from "@/features/LoginCard";

export function LoginPage() {
  return (
    <div className="flex">
      <LoginCard />
      <BackgroundAnimation />
    </div>
  );
}
