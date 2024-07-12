import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user2 = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(user2);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
