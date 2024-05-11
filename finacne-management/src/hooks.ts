import axios from "axios";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export type BankTransactionsData = {
  trans_date: Date;
  post_date: Date;
  billing_amount: number;
  merchant_name: string;
};

const loggedInUserAtom = atomWithImmer<boolean>(false);
const currentPageAtom = atomWithImmer<String>("Home");
const firstNameAtom = atomWithImmer<String>("");
const lastNameAtom = atomWithImmer<String>("");
const fullNameAtom = atomWithImmer<String>("");
const userEmailAtom = atomWithImmer<String>("");
const userDepartmentAtom = atomWithImmer<String>("");
const bankTableDataAtom = atomWithImmer<Array<BankTransactionsData>>([]);

export function useHooks() {
  const clientI = axios.create({
    baseURL: "http://127.0.0.1:8000",
    // baseURL: "http://192.168.3.248:8000",
  });
  const clientII = axios.create({
    baseURL: "http://localhost:8000",
    // baseURL: "http://card.ultiumcam.local:8000",
  });
  const urlII = "http://localhost:8000";
  // const urlII = "http://card.ultiumcam.local:8000";

  const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [userFirstName, setUserFirstName] = useAtom(firstNameAtom);
  const [userLastName, setUserLastName] = useAtom(lastNameAtom);
  const [userFullName, setUserFullName] = useAtom(fullNameAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [userDepartment, setUserDepartment] = useAtom(userDepartmentAtom);
  const [bankTableData, setBankTableData] = useAtom(bankTableDataAtom);

  return {
    clientI,
    clientII,
    urlII,
    loggedInUser,
    setLoggedInUser,
    currentPage,
    setCurrentPage,
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
    userFullName,
    setUserFullName,
    userEmail,
    setUserEmail,
    userDepartment,
    setUserDepartment,
    bankTableData,
    setBankTableData,
  };
}
