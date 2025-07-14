import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

interface IButtonProps {
  selected?: boolean;
}

const Button = styled.button<IButtonProps>`
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : "transparent"};
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.textPrimary};
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;
  &:hover {
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.lightPrimary : theme.colors.lightBlue};
  }
`;

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

interface IPaginatorProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}
const RANGE = 1; // number of pages to show before/after current

function Paginator({ currentPage, onPageChange, totalPages }: IPaginatorProps) {
  const pages = [];

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          selected={i === currentPage}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }
  } else {
    pages.push(
      <Button key={1} selected={1 === currentPage} onClick={() => goToPage(1)}>
        1
      </Button>
    );

    if (currentPage > RANGE + 2) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    for (
      let i = Math.max(2, currentPage - RANGE);
      i <= Math.min(totalPages - 1, currentPage + RANGE);
      i++
    ) {
      pages.push(
        <Button
          key={i}
          selected={i === currentPage}
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages - RANGE - 1) {
      pages.push(<Ellipsis key="start-ellipsis">…</Ellipsis>);
    }

    pages.push(
      <Button
        key={totalPages}
        selected={totalPages === currentPage}
        onClick={() => goToPage(totalPages)}
      >
        {totalPages}
      </Button>
    );
  }

  return (
    <ButtonContainer>
      <Button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      {pages}
      <Button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    </ButtonContainer>
  );
}

export default Paginator;
