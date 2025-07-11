import styled from 'styled-components'

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

   ${({ theme }) => theme.media.tablet} {
    text-align: center;
  }
`

function App() {
  return (
    <Wrapper>
      <h1>Hello World!</h1>
    </Wrapper>
  )
}

export default App
