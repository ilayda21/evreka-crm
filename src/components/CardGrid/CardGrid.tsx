import styled from "styled-components";
import DetailButton from "../DetailButton";
interface GridItem {
  name: string;
  email: string;
  role: string;
  creationDate: string;
}

interface IProps {
  data: GridItem[];
}

const CardContainer = styled.ul`
  list-style-type: none;
  margin: 2rem 3rem;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 10px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.media.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
    margin: 2rem 5rem;
  }
`;

const Card = styled.li`
  padding-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundOffWhite};
  border: ${({ theme }) => `1px solid ${theme.colors.lightBlueBorder}`};
  margin: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1.5rem;
`;

const NameInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  margin: 0;
  margin-bottom: 1rem;
`;

const Label = styled(Text)`
  font-size: 2rem;
`;

function CardGrid({ data }: IProps) {
  return (
    <CardContainer role="list">
      {data.map((item) => (
        <Card>
          <NameInfoWrapper>
            <Label>{item.name}</Label>
            <Text>{item.role}</Text>
          </NameInfoWrapper>
          <Text>{item.email}</Text>
          <Text>{item.creationDate}</Text>
          <DetailButton to={"/users/1"} label="Details" />
        </Card>
      ))}
    </CardContainer>
  );
}

export default CardGrid;
