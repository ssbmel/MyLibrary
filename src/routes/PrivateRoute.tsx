import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import Login from "../login-signup/Login";

export default function PrivateRoute() {
  const user = useUserStore((state) => state.user);
  const isLoggingOut = useUserStore((state) => state.isLoggingOut);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isLoggingOut) {
      navigate("/login");
    }
    if (isLoggingOut === true) {
      navigate("/");
    }
  }, [user, isLoggingOut]);
  
  return user ? <Outlet/> : <Login/>;
}
