import Main from "../main/Main";
import Signup from "../login-signup/Signup";
import MyPage from "../mypage/MyPage";
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import AddReview from "../book/AddReview";
import App from "../App";
import Login from "../login-signup/Login";
import BookReview from "../book/review/[id]/BookReview";

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
