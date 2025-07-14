import { useState, useRef, useEffect, useMemo } from "react";
import ToggleButton from "../../components/ToggleButton";
import DropdownInput from "../../components/DropdownInput";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import { Modal, useModal } from "../../components/Modal";
import UserForm from "../../components/UserForm";
import styled from "styled-components";
import DetailButton from "../../components/DetailButton";
import { generateFakeUsers, type User } from "../../utils/generateData";

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
`;

const Wrapper = styled.div`
  margin: 0 3rem;
`;

const SearchInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLight};

  ${({ theme }) => theme.media.tablet} {
    width: 40rem;
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

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event?.target.value);
  };

  const [view, setView] = useState<string>("table");

  const [showAll, setShowAll] = useState<boolean>(false);
  const onClick = () => {
    setShowAll((value) => !value);
  };

  const { openModal } = useModal();
  useEffect(() => {
    setUsers(generateFakeUsers(PAGE_SIZE));
  }, []);

  useEffect(() => {
    if (!showAll) return;

    if (page === 1) {
      setUsers(generateFakeUsers(PAGE_SIZE));
      return;
    }

    const newUsers = generateFakeUsers(PAGE_SIZE);
    setUsers((prev) => [...prev, ...newUsers]);
  }, [page, showAll]);

  const allUsers = useMemo(() => generateFakeUsers(5000), []);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allUsers.slice(start, start + PAGE_SIZE);
  }, [page, allUsers]);

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

  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [showAll]);

  const displayUsers = showAll ? users : paginatedUsers;

  return (
    <div>
      <HeaderContainer>
        <h2>User List</h2>
        <AddUserButton onClick={openModal}>Add user</AddUserButton>
      </HeaderContainer>

      <Wrapper>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Search..."
        />
        <ViewSettingsWrapper>
          <ToggleButton label="Show all" value={showAll} onClick={onClick} />
          <DropdownInput
            label="View"
            onClick={(key) => {
              setView(key);
            }}
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
            row={displayUsers.map((user) => [
              user.name,
              user.email,
              user.role,
              user.createdAt,
              <DetailButton to={`/users/${user.id}`} label="Details" />,
            ])}
          />
        </TableContainer>
      ) : (
        <div>
          <CardGrid
            data={displayUsers.map((user) => ({
              id: user.id,
              role: user.role,
              creationDate: user.createdAt,
              email: user.email,
              name: user.name,
            }))}
          />
        </div>
      )}
      {showAll && <div ref={loaderRef} style={{ height: "1px" }} />}

      {!showAll && (
        <Paginator
          currentPage={page}
          onPageChange={setPage}
          totalPages={Math.ceil(allUsers.length / PAGE_SIZE)}
        />
      )}

      <Modal label="New User">
        <UserForm />
      </Modal>
    </div>
  );
}

export default Home;
