import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { useUserInitialize } from "./utils/initAuth";
import Loading from "./components/Loading";
import AddButton from "./components/AddButton";
import Header from "./components/header/Header";
import Layout from "./Layout";
function App() {
  const isInitialized = useUserStore((state) => state.isInitialized);
  const { pathname } = useLocation();
  const user = useUserStore((state)=>state.user); 
  useUserInitialize();
  
  const hideAddButton =
  pathname === "/login" || pathname === "/signup" || pathname === "/add";
  
  const hideHeader = pathname === "/login" || pathname === "/signup";

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <>
      <Layout>
        {!hideHeader && <Header />}
        {user && !hideAddButton && <AddButton />}
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
