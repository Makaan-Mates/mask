import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import TopicsSelection from "./TopicsSelection";
import Profile from "./Profile";
import Verification from "./Verification";

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
      element: <Home />,
    },
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/post/:postid",
      element: <Home />,
    },
    {
      path: "/register/topics-to-follow",
      element: <TopicsSelection />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/verification",
      element: <Verification/>
    }
  ]);
  return (
    <div className="min-h-full bg-[#161616]">
      <RouterProvider router={appRouter} />
    </div>
  );
};

//bug fix
export default Body;
