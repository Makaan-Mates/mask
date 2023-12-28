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
<<<<<<< HEAD
        path:"/post/:postid",
=======
        path:"/showpost/:postid",
>>>>>>> parent of bdbc5b0 (fetched postDetails from backend and rendered in UI)
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
