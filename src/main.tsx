import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme.ts'
import GlobalStyle from './styles/GlobalStyle.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'
import { ModalProvider } from './components/Modal/ModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ModalProvider>
  </StrictMode>,
)
