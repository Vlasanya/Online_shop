import dashboard from "./dashboard";
import pages from "./page";
import utilities from "./utilities";
import support from "./support";

export interface MenuItem {
  id: string;
  type: "group" | "item" | "collapse";
  title?: string;
  url?: string;
  icon?: React.ElementType;
  target?: "_self" | "_blank";
  disabled?: boolean;
  external?: boolean;
  breadcrumbs?: boolean;
  chip?: {
    color?: "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
    variant?: "filled" | "outlined";
    size?: "small" | "medium";
    label: string;
    avatar?: string | React.ReactElement;
  };
  children?: MenuItem[];
  requireAuth?: boolean; 
}

export const menuItems: { items: MenuItem[] } = {
  items: [dashboard, pages, utilities, support] as MenuItem[],
};
