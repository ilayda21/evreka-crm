import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.backgroundOffWhite};
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  height: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightAccent};
  }
`;

interface IProps {
  label: string;
  to: string;
}

function DetailButton({ label, to }: IProps) {
  return <Button to={to}>{label}</Button>;
}

export default DetailButton;
