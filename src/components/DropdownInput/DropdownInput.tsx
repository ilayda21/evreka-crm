import { useId } from "react";
import styled from "styled-components";

interface DropdownOption {
  key: string;
  value: string;
}

interface IProps {
  label: string;
  value: string;
  options: DropdownOption[];
  view?: "vertical" | "horizontal";
  onClick: (value: string) => void;
}

const SelectInput = styled.select`
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.5rem;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
`;

interface IWrapperProps {
  $view: "vertical" | "horizontal";
}

const Wrapper = styled.div<IWrapperProps>`
  display: ${({ $view }) => ($view === "horizontal" ? "flex" : "block")};
  align-items: center;
  gap: 1rem;
`;

function DropdownInput({
  label,
  options,
  onClick,
  value,
  view = "horizontal",
}: IProps) {
  const dropdownId = useId();
  return (
    <Wrapper $view={view}>
      <label htmlFor={dropdownId}>{label}</label>
      <SelectInput
        id={dropdownId}
        value={value}
        onChange={(e) => onClick(e.target.value)}
      >
        <option value="" disabled hidden>
          -- Select a role --
        </option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </SelectInput>
    </Wrapper>
  );
}

export default DropdownInput;
