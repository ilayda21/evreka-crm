import { PAGE_SIZE } from "../utils/constants";
import type { User } from "../utils/generateData";
import { useMemo, useState, useEffect } from "react";

function usePaginateUsers(
  filteredUsers: User[],
  page: number,
  showAll: boolean
) {
  const [paginated, setPaginated] = useState<User[]>([]);

  useEffect(() => {
    if (!showAll) return;

    const offset = (page - 1) * PAGE_SIZE;
    const nextBatch = filteredUsers.slice(0, offset + PAGE_SIZE);
    setPaginated(nextBatch);
  }, [filteredUsers, page, showAll]);

  const pagedUsers = useMemo(() => {
    if (showAll) return paginated;
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page, showAll, paginated]);

  return pagedUsers;
}

export default usePaginateUsers;
