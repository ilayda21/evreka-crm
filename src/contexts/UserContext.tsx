import { createContext, useContext, useState, useEffect } from "react";
import { generateFakeUsers, type User } from "../utils/generateData";

interface IUserContext {
  users: User[];
  addUser: (user: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      const fakeUsers = generateFakeUsers(5000);
      setUsers(fakeUsers);
      localStorage.setItem("users", JSON.stringify(fakeUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers((prev) => [user, ...prev]);
  };

  return (
    <UserContext.Provider value={{ users, addUser, setUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within UserProvider");
  }
  return context;
}
