
import { AppDispatch } from "../store/configureStore";
import {
  BellOutlined,
  CloseOutlined,
  MenuOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/login/userSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* header */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-4 md:px-20">
          {/* Logo */}
          <div className="text-xl font-bold">TaskFlow</div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div>Dashboard</div>

            <div className="hover:text-gray-500 hover:scale-125 transition-all ">
              <Link className="text-inherit no-underline" to="/task">
                Task
              </Link>
            </div>

            <div className="hover:text-gray-500 hover:scale-125 transition-all">
              <Link className="text-inherit no-underline" to="/project">
                Projects
              </Link>
            </div>

            <div>Calendar</div>
            <div>Reports</div>

            <div className="">
              <BellOutlined />
            </div>

            {/* logout */}

            <IconFont
              className="text-2xl"
              type="icon-tuichu"
              onClick={handleLogout}
            />
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="ml-4 text-xl focus:outline-none"
            >
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
            <Button type="text" className="ml-2">
              <IconFont
                className="custom-icon"
                type="icon-tuichu"
                onClick={handleLogout}
              />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="space-y-4 px-6 py-4">
              <li className="text-lg">Dashboard</li>

              <li className="hover:text-gray-500 hover:scale-125 transition-all ">
                <Link className="text-inherit no-underline" to="/task">
                  Task
                </Link>
              </li>

              <li className="hover:text-gray-500 hover:scale-125 transition-all">
                <Link className="text-inherit no-underline" to="/project">
                  Projects
                </Link>
              </li>
              <li className="text-lg">Calendar</li>
              <li className="text-lg">Reports</li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
