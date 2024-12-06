import { useEffect, ReactNode } from 'react';

import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

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

  useEffect(() => {
    if (menuMaster === undefined) {
      handlerDrawerOpen(false);
    }
  }, [menuMaster]);  

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
