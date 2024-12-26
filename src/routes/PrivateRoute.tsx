import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

export default function PrivateRoute() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  
  return user ? <Outlet/> : null;
}
