import { useMemo } from "react";
import type { User } from "../utils/generateData";

function useFilteredUsers(users: User[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm) return users;

    const lowerTerm = searchTerm.toLowerCase();
    return users.filter((u) =>
      `${u.name} ${u.email}`.toLowerCase().includes(lowerTerm)
    );
  }, [users, searchTerm]);
}

export default useFilteredUsers;
