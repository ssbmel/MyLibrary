import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import Login from "../login-signup/Login";

export default function PrivateRoute() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isLoggedIn) {
      navigate("/login");
    }
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [user, isLoggedIn]);
  
  return user ? <Outlet/> : <Login/>;
}
