import { useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import DropdownInput from "../../components/DropdownInput";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import { Modal, useModal } from "../../components/Modal";
import UserForm from "../../components/UserForm";
import styled from "styled-components";
import DetailButton from "../../components/DetailButton";

const AddUserButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  cursor: pointer;
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
  width: 40rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

const ViewSettingsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Home() {
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
        <div>
          <Table
            headers={["Name", "Email", "Role", "Creation Date", ""]}
            row={[
              [
                "Example",
                "Example",
                "Example",
                "Example",
                <DetailButton to={"/users/1"} label="Details" />,
              ],
              [
                "Example",
                "Example",
                "Example",
                "Example",
                <DetailButton to={"/users/1"} label="Details" />,
              ],
            ]}
          />
        </div>
      ) : (
        <div>
          <CardGrid
            data={[
              {
                role: "role",
                creationDate: "date",
                email: "email",
                name: "name",
              },
              {
                role: "role",
                creationDate: "date",
                email: "email",
                name: "name",
              },
            ]}
          />
        </div>
      )}

      {!showAll && <Paginator />}

      <Modal label="New User">
        <UserForm />
      </Modal>
    </div>
  );
}

export default Home;
