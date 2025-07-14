import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import "leaflet/dist/leaflet.css";
import { UserProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </UserProvider>
);
