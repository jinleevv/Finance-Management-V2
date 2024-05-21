import { useHooks } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

export function Footer() {
  const {
    clientII,
    userFirstName,
    userLastName,
    userDepartment,
    userEmail,
    setLoggedInUser,
  } = useHooks();
  const navigate = useNavigate();

  async function handleLogout(e: any) {
    e.preventDefault();
    await clientII.post("/api/logout/", { withCredentials: true }).then(() => {
      setLoggedInUser(false);
      navigate("/");
    });
  }

  return (
    <footer className="flex border-t cursor-pointer items-center gap-2 lg:p-7 p-2">
      <div className="mr-1">
        <Avatar className="hover:shadow-lg">
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex lg:gap-12 gap-2">
        <div className="grid">
          <Label className="font-bold">
            {userFirstName} {userLastName},{" "}
            <span className="font-normal text-xs">{userDepartment}</span>
          </Label>
          <Label className="text-xs">{userEmail}</Label>
        </div>
        <div className="flex justify-end" onClick={handleLogout}>
          <img src="/icons/logout.svg" alt="logout" />
        </div>
      </div>
    </footer>
  );
}
