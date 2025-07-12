import styled from 'styled-components'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundOffWhite};
  color: ${({ theme }) => theme.colors.textPrimary};

   ${({ theme }) => theme.media.tablet} {
    text-align: center;
  }
`

function Home() {
    return (
        <Wrapper>
            <h1>Hello World!</h1>
        </Wrapper>
    )
}

export default Home
