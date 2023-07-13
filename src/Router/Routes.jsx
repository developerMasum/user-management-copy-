import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Users from "../Pages/Users";
import AddUsers from "../Pages/AddUsers";
import ViewUsers from "../Pages/ViewUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Users />,
      },
      {
        path: "/add-user",
        element: <AddUsers />,
      },
      ,
      {
        path: "/add-user/:id",
        element: <AddUsers />,
      },
      {
        path: "/view-user/:id",
        element: <ViewUsers />,
        loader: ({ params }) =>
          fetch(
            `https://user-management-server-alpha.vercel.app/users/${params.id}`
          ),
      },
    ],
  },
]);
export default router;
