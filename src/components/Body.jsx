import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ShowPost from "./ShowPost";

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
        path: "/home",
        element: <Home/>
      },
      {
      path: "/",
      element: <Navigate to="/home"/>
      },
      {

        path:"/post/:postid",
        element: <ShowPost/>
      }
  ]);
  return  (
    <div className="min-h-full bg-zinc-800 text-zinc-200">
        <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
