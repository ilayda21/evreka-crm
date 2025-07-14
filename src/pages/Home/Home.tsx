import { useState, useRef, useEffect, useMemo } from "react";
import ToggleButton from "../../components/ToggleButton";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import styled from "styled-components";
import DetailButton from "../../components/DetailButton";
import { type User } from "../../utils/generateData";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../contexts/UserContext";
import { PAGE_SIZE } from "../../utils/constants";

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
  margin: 0 3rem;

  ${({ theme }) => theme.media.tablet} {
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 0 5rem;
  }
`;

const Wrapper = styled.div`
  margin: 0 3rem;

  ${({ theme }) => theme.media.tablet} {
    display: flex;
    gap: 4rem;
    justify-content: space-between;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 0 5rem;
  }
`;

const Search = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.75rem 0;
`;

const SearchInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  font-size: 1.5rem;

  ${({ theme }) => theme.media.desktop} {
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
  font-size: 1.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
`;

const ClearButton = styled.button`
  background-color: ${({ theme }) => theme.colors.lightBlueBorder};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: none;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlue};
  }
`;

const ViewSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    gap: 4rem;
    flex-shrink: 0;
    justify-content: flex-end;
  }
`;

const TableContainer = styled.div`
  overflow-x: scroll;
`;

const HeaderLabel = styled.h2`
  margin: 1rem 0;
`;

const Loader = styled.div`
  height: 1px;
`;

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const [cardView, setCardView] = useState<boolean>(false);

  const { users: userCache } = useUsers();

  const navigate = useNavigate();
  const location = useLocation();

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
        <HeaderLabel>User List</HeaderLabel>
        <AddUserButton
          onClick={() => {
            navigate("/new", { state: { backgroundLocation: location } });
          }}
        >
          Add user
        </AddUserButton>
      </HeaderContainer>

      <Wrapper>
        <Search>
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
        </Search>

        <ViewSettingsWrapper>
          <ToggleButton
            label="Show all"
            value={showAll}
            onClick={() => setShowAll((v) => !v)}
          />
          <ToggleButton
            label="Card View"
            value={cardView}
            onClick={() => setCardView((v) => !v)}
          />
        </ViewSettingsWrapper>
      </Wrapper>

      {!cardView ? (
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

      {showAll && <Loader ref={loaderRef} />}

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
