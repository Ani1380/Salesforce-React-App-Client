// useAccount.js
import { useContext, createContext } from "react";

export const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);
