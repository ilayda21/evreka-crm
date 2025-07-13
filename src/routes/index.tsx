import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
]);
