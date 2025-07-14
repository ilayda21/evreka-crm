import { useId } from "react";
import styled from "styled-components";

interface ISwitchProps {
  $isOn: boolean;
}

const Switch = styled.div<ISwitchProps>`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 5rem;
  margin: 5px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  transform: ${({ $isOn }) => ($isOn ? "translateX(2rem)" : "translateX(0)")};
  transition: transform 0.3s ease;
`;

interface IButtonProps {
  $isOn: boolean;
}

const Button = styled.button<IButtonProps>`
  background-color: ${({ theme, $isOn }) =>
    $isOn ? theme.colors.primary : theme.colors.backgroundGray};
  padding: 0;
  border-radius: 5rem;
  width: 5rem;
  height: 3rem;
  border: none;
  display: flex;
  align-items: center;
  position: relative;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

interface IProps {
  label: string;
  value: boolean;
  onClick: () => void;
}

function ToggleButton({ label, onClick, value }: IProps) {
  const toggleButtonId = useId();

  return (
    <Wrapper>
      <label id={toggleButtonId}>{label}</label>
      <Button
        role="switch"
        aria-checked={value}
        aria-labelledby={toggleButtonId}
        onClick={onClick}
        $isOn={value}
      >
        <Switch $isOn={value} />
      </Button>
    </Wrapper>
  );
}

export default ToggleButton;
