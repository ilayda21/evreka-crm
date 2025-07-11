import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

function App() {
  return (
    <Wrapper>
      <h1>Hello World!</h1>
    </Wrapper>
  )
}

export default App
