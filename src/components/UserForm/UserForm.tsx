import styled from "styled-components";

const Form = styled.form``;

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
  gap: 0.5rem;
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

interface IProps {}

function UserForm({}: IProps) {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("Submitted!");
      }}
    >
      <LabeledInput>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          // value={form.name}
          // onChange={handleChange}
          required
        />
      </LabeledInput>
      <LabeledInput>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          // value={form.name}
          // onChange={handleChange}
          required
        />
      </LabeledInput>
      <LabeledInput>
        <label htmlFor="role">Role</label>
        <Input
          id="role"
          name="role"
          // value={form.name}
          // onChange={handleChange}
          required
        />
      </LabeledInput>

      <SubmitButton type="submit">Save</SubmitButton>
    </Form>
  );
}

export default UserForm;
