// AccountContext.jsx
import { useState } from "react";
import { AccountContext } from "../hooks/AccountHooks";

export const AccountProvider = ({ children }) => {
  const [accountId, setAccountId] = useState(null);

  return (
    <AccountContext.Provider value={{ accountId, setAccountId }}>
      {children}
    </AccountContext.Provider>
  );
};
