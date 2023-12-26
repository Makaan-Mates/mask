import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <Home/>
      }
  ]);
  return  (
    <div className="min-h-screen bg-zinc-800">
        <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
