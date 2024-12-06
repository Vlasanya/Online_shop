// assets
import { DashboardOutlined } from '@ant-design/icons';
import { MenuItem } from "./index";

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: MenuItem = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group" as const, // Explicitly define the type
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item" as const, // Explicitly define the type
      url: "/",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
