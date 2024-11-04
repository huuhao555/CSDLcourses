import { memo, useContext } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../router/path";
import { UserContext } from "../../../middleware/UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header-container">
      <div className="header-row">
        <button className="logo" onClick={() => handleNavigate("/")}>
          Courses - N.6
        </button>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavigate("/")}>
                Trang chủ
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavigate("/courses")}
              >
                Thêm khoá học
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => handleNavigate("/contact")}
              >
                Liên hệ
              </button>
            </li>
            {user && (
              <li className="nav-item">
                <button
                  className="nav-link logout-button"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </li>
            )}
          </ul>
        </nav>
        {!user && (
          <div className="auth-buttons">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleNavigate(ROUTERS.LOGIN)}
            >
              Login
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => handleNavigate(ROUTERS.SIGNUP)}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
