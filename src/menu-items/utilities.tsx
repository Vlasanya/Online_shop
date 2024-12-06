// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { MenuItem } from "./index";

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities: MenuItem = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default utilities;
