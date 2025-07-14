import { useState, useRef, useEffect, useMemo } from "react";
import ToggleButton from "../../components/ToggleButton";
import DropdownInput from "../../components/DropdownInput";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import styled from "styled-components";
import DetailButton from "../../components/DetailButton";
import { generateFakeUsers, type User } from "../../utils/generateData";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const AddUserButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin: 0 3rem;
  ${({ theme }) => theme.media.desktop} {
    margin: 0 5rem;
  }
`;

const Wrapper = styled.div`
  margin: 0 3rem;
  ${({ theme }) => theme.media.desktop} {
    margin: 0 5rem;
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  ${({ theme }) => theme.media.tablet} {
    width: 30rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
`;

const ClearButton = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const ViewSettingsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
  }
`;

const TableContainer = styled.div`
  overflow-x: scroll;
`;

const PAGE_SIZE = 30;
const TOTAL_USERS = 5000;

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [userCache, setUserCache] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const [view, setView] = useState<string>("table");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      const parsed: User[] = JSON.parse(stored);
      setUserCache(parsed);
    } else {
      const full = generateFakeUsers(TOTAL_USERS);
      setUserCache(full);
      localStorage.setItem("users", JSON.stringify(full));
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [showAll, searchTerm]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return userCache;
    return userCache.filter((user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, userCache]);

  useEffect(() => {
    if (!showAll) return;

    const offset = (page - 1) * PAGE_SIZE;
    const next = filteredUsers.slice(0, offset + PAGE_SIZE);
    setUsers(next);
  }, [page, showAll, filteredUsers]);

  useEffect(() => {
    if (!showAll || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [showAll]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [page, filteredUsers]);

  const displayUsers = showAll ? users : paginatedUsers;

  const onSearchClick = () => {
    if (searchInput) {
      setSearchParams({ search: searchInput });
    } else {
      setSearchParams({});
    }
    setPage(1);
  };

  return (
    <div>
      <HeaderContainer>
        <h2>User List</h2>
        <AddUserButton
          onClick={() => {
            navigate("/new", { state: { backgroundLocation: location } });
          }}
        >
          Add user
        </AddUserButton>
      </HeaderContainer>

      <Wrapper>
        <SearchRow>
          <SearchInput
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
          <SearchButton onClick={onSearchClick}>Search</SearchButton>
          <ClearButton
            onClick={() => {
              setSearchInput("");
              setSearchParams({});
              setPage(1);
            }}
          >
            Clear
          </ClearButton>
        </SearchRow>

        <ViewSettingsWrapper>
          <ToggleButton
            label="Show all"
            value={showAll}
            onClick={() => setShowAll((v) => !v)}
          />
          <DropdownInput
            label="View"
            onClick={(key) => setView(key)}
            options={[
              { key: "table", value: "Table" },
              { key: "card", value: "Card" },
            ]}
            value={view}
          />
        </ViewSettingsWrapper>
      </Wrapper>

      {view === "table" ? (
        <TableContainer>
          <Table
            headers={["Name", "Email", "Role", "Creation Date", ""]}
            row={displayUsers.map((user) => ({
              id: user.id,
              data: [
                user.name,
                user.email,
                user.role,
                user.createdAt,
                <DetailButton
                  key={user.id}
                  to={`/users/${user.id}`}
                  label="Details"
                />,
              ],
            }))}
          />
        </TableContainer>
      ) : (
        <CardGrid data={displayUsers} />
      )}

      {showAll && <div ref={loaderRef} style={{ height: "1px" }} />}

      {!showAll && (
        <Paginator
          currentPage={page}
          onPageChange={setPage}
          totalPages={Math.ceil(filteredUsers.length / PAGE_SIZE)}
        />
      )}
    </div>
  );
}

export default Home;
