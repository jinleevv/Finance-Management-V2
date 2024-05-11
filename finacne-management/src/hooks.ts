import axios from "axios";
import { atom, useAtom } from "jotai";
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

const currentPageAtom = atomWithImmer<String>("Home");
const firstNameAtom = atomWithImmer<String>("");
const lastNameAtom = atomWithImmer<String>("");
const bankTableDataAtom = atomWithImmer<Array<BankTransactionsData>>([]);

export function useHooks() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [userFirstName, setUserFirstName] = useAtom(firstNameAtom);
  const [userLastName, setUserLastName] = useAtom(lastNameAtom);
  const [bankTableData, setBankTableData] = useAtom(bankTableDataAtom);

  return {
    currentPage,
    setCurrentPage,
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
    bankTableData,
    setBankTableData,
  };
}
