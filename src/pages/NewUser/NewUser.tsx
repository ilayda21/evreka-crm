import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import { useUsers } from "../../contexts/UserContext";
import { generateRandomLocation } from "../../utils/generateData";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backdrop};
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: fit-content;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightBlueBorder}`};
  padding: 1rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ModalLabel = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 2rem;
`;

const ModalCloseButton = styled(Link)`
  border: none;
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalContent = styled.div`
  padding: 2rem 1rem;
`;

function NewUser() {
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (userData: {
    name: string;
    email: string;
    role: string;
  }) => {
    const newUser = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: generateRandomLocation(),
    };

    addUser(newUser);
    navigate("/", { replace: true });
  };

  return (
    <Wrapper>
      <ModalContainer>
        <ModalHeader>
          <ModalLabel>New User</ModalLabel>
          <ModalCloseButton to={"/"}>x</ModalCloseButton>
        </ModalHeader>

        <ModalContent>
          <UserForm onSubmit={handleSubmit} />
        </ModalContent>
      </ModalContainer>
    </Wrapper>
  );
}
export default NewUser;
