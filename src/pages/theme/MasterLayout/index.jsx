import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import { UserProvider } from "../../../middleware/UserContext";

const MasterLayout = (props) => {
  return (
    <UserProvider>
      <div {...props}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserProvider>
  );
};

export default MasterLayout;
