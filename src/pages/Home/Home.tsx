import { useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import DropdownInput from "../../components/DropdownInput";
import Table from "../../components/Table";
import CardGrid from "../../components/CardGrid";
import Paginator from "../../components/Paginator";
import { Modal, useModal } from "../../components/Modal";
import UserForm from "../../components/UserForm";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AddUserButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
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

const DetailsButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.backgroundOffWhite};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
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
                <DetailsButton to={"/users/1"}>Details</DetailsButton>,
              ],
              [
                "Example",
                "Example",
                "Example",
                "Example",
                <DetailsButton to={"/users/2"}>Details</DetailsButton>,
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

      <Modal>
        <h2>New User</h2>
        <UserForm />
      </Modal>
    </div>
  );
}

export default Home;
