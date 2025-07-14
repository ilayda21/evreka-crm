import { useState } from "react";
import styled from "styled-components";
import DropdownInput from "../DropdownInput";
import { ROLES } from "../../utils/constants";
import Checkbox from "../Checkbox";

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 5px;
  width: 100%;
  margin-top: 0.75rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightPrimary};
  }
`;

const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  border: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  border-radius: 5px;
  padding: 0.75rem;
  width: 30rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
`;

interface IProps {
  onSubmit: (data: {
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  }) => void;
}

function UserForm({ onSubmit }: IProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    isActive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role: string) => {
    setForm((prev) => ({ ...prev, role }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <LabeledInput>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </LabeledInput>
      <LabeledInput>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
        />
      </LabeledInput>
      <LabeledInput>
        <DropdownInput
          label="Role"
          onClick={handleRoleChange}
          value={form.role}
          options={ROLES.map((role) => ({ key: role, value: role }))}
          view="vertical"
          required
        />
      </LabeledInput>

      <Checkbox
        checked={form.isActive}
        label="Active"
        onChange={(value) => setForm((prev) => ({ ...prev, isActive: value }))}
      />

      <SubmitButton type="submit">Save</SubmitButton>
    </form>
  );
}

export default UserForm;
