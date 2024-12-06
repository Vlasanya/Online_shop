// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import { MenuItem } from "./index";

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support: MenuItem = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/',
      icon: icons.ChromeOutlined
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: 'https://github.com/Vlasanya',
      icon: icons.QuestionOutlined,
      external: true,
      target: '_blank'
    }
  ]
};

export default support;
