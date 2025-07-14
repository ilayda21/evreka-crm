import { useState, useRef, useEffect, useCallback } from "react";
import ToggleButton from "../../components/ToggleButton";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import styled from "styled-components";
import DetailButton from "../../components/DetailButton";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../contexts/UserContext";
import { PAGE_SIZE } from "../../utils/constants";
import useFilteredUsers from "../../hooks/useFilterUsers";
import usePaginateUsers from "../../hooks/usePaginateUsers";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

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
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [isCardView, setIsCardView] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { users: userCache } = useUsers();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchInput(searchTerm);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [showAll, searchTerm]);

  const filteredUsers = useFilteredUsers(userCache, searchTerm);
  const displayUsers = usePaginateUsers(filteredUsers, page, showAll);

  const loadMore = useCallback(() => setPage((p) => p + 1), []);
  useInfiniteScroll(loaderRef, showAll, loadMore);

  const onSearchClick = useCallback(() => {
    if (searchInput) setSearchParams({ search: searchInput });
    else setSearchParams({});
    setPage(1);
  }, [searchInput, setSearchParams]);

  const onClear = useCallback(() => {
    setSearchInput("");
    setSearchParams({});
    setPage(1);
  }, [setSearchParams]);

  const toggleShowAll = useCallback(() => setShowAll((v) => !v), []);
  const toggleCardView = useCallback(() => setIsCardView((v) => !v), []);

  const onAddUser = useCallback(() => {
    navigate("/new", { state: { backgroundLocation: location } });
  }, [navigate, location]);

  return (
    <div>
      <HeaderContainer>
        <HeaderLabel>User List</HeaderLabel>
        <AddUserButton onClick={onAddUser}>Add user</AddUserButton>
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
          <ClearButton onClick={onClear}>Clear</ClearButton>
        </Search>

        <ViewSettingsWrapper>
          <ToggleButton
            label="Show all"
            value={showAll}
            onClick={toggleShowAll}
          />
          <ToggleButton
            label="Card View"
            value={isCardView}
            onClick={toggleCardView}
          />
        </ViewSettingsWrapper>
      </Wrapper>

      {!isCardView ? (
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
