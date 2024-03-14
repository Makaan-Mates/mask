import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import TopicsSelection from "./topic/TopicsSelection";
import Profile from "./profile/Profile";
import BookMarkedPosts from "./bookmark/BookMarkedPosts";
import Verification from "./auth/Verification";
import FeedBack from "./feedback/FeedBack";
import NotFoundPage from "./error/NotFoundPage";

// const RequireVerification = ({ children }) => {
//   let isVerified = localStorage.getItem("isVerified") === "true";
//   return isVerified ? children : <Navigate to="/verification" />;
// };

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
      element: (
          <Home />
      ),
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
      path: "/topics-to-follow",
      element: <TopicsSelection />,
    },
    {
      path: "/profile/",
      element: <Profile />,
    },
    {
      path: "/user/bookmarks",
      element: <BookMarkedPosts />,
    },
    {
      path: "/verification",
      element: <Verification />,
    },
    {
      path: "/user/feedback",
      element: <FeedBack />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return (
    <div className="min-h-full bg-[#161616]">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
