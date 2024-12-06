import { useEffect, ReactNode } from 'react';

// material-ui
// import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import Header from './Header';
import Loader from '@/components/Loader';

import { handlerDrawerOpen, useGetMenuMaster } from '@/api/menu';

// ==============================|| MAIN LAYOUT ||============================== //

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { menuMasterLoading, menuMaster } = useGetMenuMaster();
  // const downXL = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  useEffect(() => {
    // Initialize the Drawer state to false
    if (menuMaster === undefined) {
      handlerDrawerOpen(false);
    }
  }, [menuMaster]);
  
  // useEffect(() => {
  //   // Update the Drawer state based on screen size after initialization
  //   if (menuMaster) {
  //     handlerDrawerOpen(!downXL);
  //   }
  // }, [downXL, menuMaster]);  

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
