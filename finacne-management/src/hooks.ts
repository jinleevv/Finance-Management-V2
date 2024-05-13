import axios from "axios";
import { startOfMonth } from "date-fns";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { DateRange } from "react-day-picker";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export type MyTransactionsData = {
  trans_date: Date;
  billing_amount: number;
  merchant_name: string;
  category: string;
  purpose: string;
  first_name: string;
  last_name: string;
  tps: number;
  tvq: number;
  img: string;
};

export type StatusBankTransactionsData = {
  status: string;
  trans_date: Date;
  post_date: Date;
  billing_amount: number;
  merchant_name: string;
};

export type DateRangeType = {
  from: string;
  to: string;
};

const initialFromDate = startOfMonth(new Date());
const initialToDate = new Date();

const dateAtom = atomWithImmer<DateRange | undefined>({
  from: initialFromDate,
  to: initialToDate,
});

const loggedInUserAtom = atomWithImmer<boolean>(false);
const currentPageAtom = atomWithImmer<String>("Home");
const firstNameAtom = atomWithImmer<String>("");
const lastNameAtom = atomWithImmer<String>("");
const fullNameAtom = atomWithImmer<String>("");
const userEmailAtom = atomWithImmer<String>("");
const userDepartmentAtom = atomWithImmer<String>("");
const myTableDataAtom = atomWithImmer<Array<MyTransactionsData>>([]);
const statusBankTableDataAtom = atomWithImmer<
  Array<StatusBankTransactionsData>
>([]);

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
  const [myTableData, setMyTableData] = useAtom(myTableDataAtom);
  const [statusBankTableData, setStatusBankTableData] = useAtom(
    statusBankTableDataAtom
  );
  const [calenderDate, setCalenderDate] = useAtom(dateAtom);

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
    myTableData,
    setMyTableData,
    statusBankTableData,
    setStatusBankTableData,
    calenderDate,
    setCalenderDate,
  };
}
