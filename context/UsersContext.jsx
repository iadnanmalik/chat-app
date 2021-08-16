import { createContext, useContext } from "react";
import { useState } from "react/cjs/react.development";

const UsersContext = createContext();

export function UsersWrapper({ children }) {
  const [user, setUser] = useState({});
  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
