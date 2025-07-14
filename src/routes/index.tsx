import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import UserDetail from "../pages/UserDetail";
import NewUser from "../pages/NewUser/NewUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "new", element: <NewUser /> },
      { path: "users/:id", element: <UserDetail /> },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
]);
