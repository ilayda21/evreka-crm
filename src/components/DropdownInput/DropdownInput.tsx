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
  onClick: (value: string) => void;
}

const SelectInput = styled.select`
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1.5rem;
  width: 9rem;
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function DropdownInput({ label, options, onClick, value }: IProps) {
  const dropdownId = useId();
  return (
    <Wrapper>
      <label htmlFor={dropdownId}>{label}</label>
      <SelectInput
        id={dropdownId}
        value={value}
        onChange={(e) => onClick(e.target.value)}
      >
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
