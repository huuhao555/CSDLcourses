import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ROUTERS } from "./router/path";
import MasterLayout from "./pages/theme/MasterLayout";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
const RouterCustom = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path={ROUTERS.HOMEPAGE} element={<HomePage />} />
        <Route path={ROUTERS.LOGIN} element={<Login />} />
        <Route path={ROUTERS.SIGNUP} element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default RouterCustom;
