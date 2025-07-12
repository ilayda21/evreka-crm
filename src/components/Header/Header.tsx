import styled from 'styled-components'

const HeaderWrapper = styled.header`
  border-bottom:  ${({ theme }) => `1px solid ${theme.colors.backgroundGray}`};
  height: 5rem;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    height: 7rem;
  }

  ${({ theme }) => theme.media.desktop} {
    height: 10rem;
  }
`

const HeaderText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  padding: 0 1rem;

  ${({ theme }) => theme.media.tablet} {
    padding: 0 3rem;
    font-size: 2.5rem;
  }

  ${({ theme }) => theme.media.desktop} {
    padding: 0 5rem;
    font-size: 3rem;
  }
`

function Header() {
    return (
        <HeaderWrapper>
            <HeaderText>
                Mini CRM
            </HeaderText>
        </HeaderWrapper>
    )
}

export default Header
