import { DashboardOutlined } from '@ant-design/icons';
import { MenuItem } from "./index";

const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: MenuItem = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group" as const,
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item" as const,
      url: "/",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
