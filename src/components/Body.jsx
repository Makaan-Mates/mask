import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
  ]);
  return  <RouterProvider router={appRouter} />;
};

export default Body;
