import styled from "styled-components";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  user-select: none;
  margin-bottom: 0.5rem;
`;

const CheckboxInput = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <CheckboxWrapper>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </CheckboxWrapper>
  );
}

export default Checkbox;
