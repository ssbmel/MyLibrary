import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { ReactNode, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/loginhome");
    }
  }, [user, navigate]);

  return user ? <>{children}</> : null;
}
