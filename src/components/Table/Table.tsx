import styled from "styled-components";

const HeaderCell = styled.th`
  text-align: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightBlueBorder}`};

  ${({ theme }) => theme.media.tablet} {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  &:first-child {
    padding-left: 3rem;

    ${({ theme }) => theme.media.desktop} {
      padding-left: 5rem;
    }
  }

  &:last-child {
    padding-right: 3rem;

    ${({ theme }) => theme.media.desktop} {
      padding-right: 5rem;
    }
  }
`;

const TableRow = styled.tr`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.lightBlueBorder}`};
`;

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 3rem;
  margin-top: 1rem;
`;

const TableCell = styled.td`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:first-child {
    padding-left: 3rem;

    ${({ theme }) => theme.media.desktop} {
      padding-left: 5rem;
    }
  }

  &:last-child {
    text-align: right;
    padding-right: 3rem;

    ${({ theme }) => theme.media.desktop} {
      padding-right: 5rem;
    }
  }
`;

interface IProps {
  headers: Array<string>;
  row: Array<{ id: string; data: Array<string | React.ReactNode> }>;
}

function Table({ headers, row }: IProps) {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {headers.map((header) => (
            <HeaderCell key={header}>{header}</HeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {row.map((cells) => (
          <TableRow key={cells.id}>
            {cells.data.map((cell, index) => (
              <TableCell key={`${cells.id}-${index}`}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableWrapper>
  );
}

export default Table;
