import axios from "axios";
import { startOfMonth } from "date-fns";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { DateRange } from "react-day-picker";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export type TableData = {
  trans_date: Date;
  billing_amount: number;
  merchant_name: string;
  category: string;
  purpose: string;
  first_name: string;
  last_name: string;
  tps: number;
  tvq: number;
};

export type BankTableData = {
  trans_date: Date;
  post_date: Date;
  billing_amount: number;
  merchant_name: string;
  first_name: string;
  last_name: string;
};

export type ForceUserData = {
  trans_date: string;
  billing_amount: number;
  merchant_name: string;
  first_name: string;
  last_name: string;
};

export type ForceBankData = {
  trans_date: string;
  post_date: string;
  billing_amount: number;
  merchant_name: string;
  first_name: string;
  last_name: string;
};

export type DateRangeType = {
  from: string;
  to: string;
};

const logedInUserAtom = atomWithImmer<boolean>(false);
const userFirstNameAtom = atomWithImmer<string>("");
const userLastNameAtom = atomWithImmer<string>("");
const userNameAtom = atomWithImmer<string>("");
const userEmailAtom = atomWithImmer<string>("");
const tableDataAtom = atomWithImmer<Array<TableData>>([]);
const missingTableDataAtom = atomWithImmer<Array<TableData>>([]);
const bankTableDataAtom = atomWithImmer<Array<BankTableData>>([]);
const missingBankTableDataAtom = atomWithImmer<Array<BankTableData>>([]);
const matchingTransactionsDataAtom = atomWithImmer<Array<BankTableData>>([]);
const departmentAtom = atomWithImmer<string>("");
const forceMatchUser = atomWithImmer<ForceUserData>({
  trans_date: "",
  billing_amount: -1,
  merchant_name: "",
  first_name: "",
  last_name: "",
});
const forceMatchBank = atomWithImmer<ForceBankData>({
  trans_date: "",
  post_date: "",
  billing_amount: -1,
  merchant_name: "",
  first_name: "",
  last_name: "",
});

const initialFromDate = startOfMonth(new Date());
const initialToDate = new Date();

const dateAtom = atomWithImmer<DateRange | undefined>({
  from: initialFromDate,
  to: initialToDate,
});

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

  const [logedInUser, setLogedInUser] = useAtom(logedInUserAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const [userFirstName, setUserFirstName] = useAtom(userFirstNameAtom);
  const [userLastName, setUserLastName] = useAtom(userLastNameAtom);
  const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  const [tableData, setTableData] = useAtom(tableDataAtom);
  const [missingTableData, setMissingTableData] = useAtom(missingTableDataAtom);
  const [bankTableData, setBankTableData] = useAtom(bankTableDataAtom);
  const [missingBankTableData, setMissingBankTableData] = useAtom(
    missingBankTableDataAtom
  );
  const [matchingTableData, setMatchingTableData] = useAtom(
    matchingTransactionsDataAtom
  );
  const [department, setDepartment] = useAtom(departmentAtom);
  const [forceMatchUserData, setForceMatchUserData] = useAtom(forceMatchUser);
  const [forceMatchBankData, setForceMatchBankData] = useAtom(forceMatchBank);
  const [calenderDate, setCalenderDate] = useAtom(dateAtom);

  return {
    clientI,
    clientII,
    urlII,
    logedInUser,
    setLogedInUser,
    userName,
    setUserName,
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
    userEmail,
    setUserEmail,
    tableData,
    setTableData,
    missingTableData,
    setMissingTableData,
    bankTableData,
    setBankTableData,
    missingBankTableData,
    setMissingBankTableData,
    matchingTableData,
    setMatchingTableData,
    department,
    setDepartment,
    forceMatchUserData,
    setForceMatchUserData,
    forceMatchBankData,
    setForceMatchBankData,
    calenderDate,
    setCalenderDate,
  };
}
