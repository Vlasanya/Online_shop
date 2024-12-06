import GitHubIcon from '@mui/icons-material/GitHub';
import VercelIcon from '@mui/icons-material/InsertLink';
import { MenuItem } from "./index";

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support: MenuItem = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'vercel',
      title: 'Vercel',
      type: 'item',
      url: 'https://online-shop-black-iota.vercel.app',
      icon: VercelIcon,
       external: true,
      target: '_blank'
    },
    {
      id: 'gitHub',
      title: 'GitHub',
      type: 'item',
      url: 'https://github.com/Vlasanya/Online_shop',
      icon: GitHubIcon,
      external: true,
      target: '_blank'
    }
  ]
};

export default support;
