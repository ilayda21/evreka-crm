import React from "react";
import { useModal } from "./ModalContext";
import styled from "styled-components";

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

const ModalCloseButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 2rem 1rem;
`;

const Modal = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <Wrapper>
      <ModalContainer>
        <ModalHeader>
          <ModalLabel>{label}</ModalLabel>
          <ModalCloseButton
            onClick={closeModal}
            className=""
            aria-label="Close Modal"
          >
            x
          </ModalCloseButton>
        </ModalHeader>

        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Wrapper>
  );
};

export default Modal;
