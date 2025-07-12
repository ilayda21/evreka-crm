import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%; /* 1rem = 10px */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.backgroundOffWhite};
    color: ${({ theme }) => theme.colors.textPrimary};
    height: 100vh;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`

export default GlobalStyle
