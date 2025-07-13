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
`;

const Wrapper = styled.div`
  margin: 0 2em;
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
    <Wrapper>
      <HeaderContainer>
        <h2>User List</h2>
        <AddUserButton onClick={openModal}>Add user</AddUserButton>
      </HeaderContainer>

      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Search..."
        />
        <div>
          <ToggleButton label="Show all" value={showAll} onClick={onClick} />
          <DropdownInput
            label="View:"
            onClick={(key) => {
              setView(key);
            }}
            options={[
              { key: "table", value: "Table" },
              { key: "card", value: "Card" },
            ]}
            value={view}
          />
        </div>
      </div>

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
                <Link to={"/users/1"}>Details</Link>,
              ],
              [
                "Example",
                "Example",
                "Example",
                "Example",
                <Link to={"/users/2"}>Details</Link>,
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
    </Wrapper>
  );
}

export default Home;
