import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from '@/components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //
interface DrawerContentProps {
  onItemClick: () => void;
}


export default function DrawerContent({ onItemClick }: DrawerContentProps) {
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
        <NavCard onItemClick={onItemClick} />
      </SimpleBar>
    </>
  );
}
