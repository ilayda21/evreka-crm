import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  height: 5rem;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    height: 7rem;
  }

  ${({ theme }) => theme.media.desktop} {
    height: 10rem;
  }
`;

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0 3rem;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 3rem;
    font-size: 2.5rem;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 0 5rem;
    font-size: 3rem;
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderLink to="/">
        <HeaderText>Mini CRM</HeaderText>
      </HeaderLink>
    </HeaderWrapper>
  );
}

export default Header;
