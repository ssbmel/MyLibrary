import Main from "../pages/main/Main";
import MyPage from "../pages/mypage/MyPage";
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login-signup/Login";
import Signup from "../pages/login-signup/Signup";
import BookReview from "../pages/book/review/[id]/BookReview";
import AddReview from "../pages/book/AddReview";

const router = createBrowserRouter([

  {
    element: <App />, 
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/bookreview/:id",
        element: <BookReview/>
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/mypage", element: <MyPage/>},
          { path: "/add", element: <AddReview/>}
        ]
      }
    ]
  }
]);

export default router;
