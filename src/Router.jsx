import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./main/Main";
import LoginHome from "./login-signup/LoginHome";
import Signup from "./login-signup/Signup";
import PrivateRoute from "./communal/PrivateRoute";
import MyPage from "./mypage/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/loginhome" element={<LoginHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
