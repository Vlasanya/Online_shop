import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { MenuItem } from "./index";

const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages: MenuItem = {
  id: "authentication",
  title: "Authentication",
  type: "group",
  children: [
    {
      id: "login1",
      title: "Login",
      type: "item",
      url: "/login",
      icon: icons.LoginOutlined,
      target: "_blank",
      requireAuth: false,
    },
    {
      id: "register1",
      title: "Register",
      type: "item",
      url: "/register",
      icon: icons.ProfileOutlined,
      target: "_blank",
      requireAuth: false,
    },
  ],
};



export default pages;
