import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface IButtonProps {
  selected?: boolean;
}

const Button = styled.button<IButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : "transparent"};
  border: none;
  cursor: pointer;
  border-radius: 50rem;
  width: 3rem;
  height: 3rem;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.textPrimary};

  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.lightPrimary : theme.colors.lightBlue};
  }
`;

function Paginator() {
  return (
    <ButtonContainer>
      <Button>&lt;</Button>
      <Button>1</Button>
      <Button selected={true}>2</Button>
      <Button>3</Button>
      <Button>&gt;</Button>
    </ButtonContainer>
  );
}

export default Paginator;
