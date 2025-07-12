import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

function App() {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default App
