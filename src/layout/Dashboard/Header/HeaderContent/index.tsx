import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeToggle from "@/components/themeToggle";
import Box from "@mui/material/Box";
import Profile from "./Profile";
import Notification from "./Notification";
import MobileSection from "./MobileSection";
import Cart from "@/components/cart";

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      {downLG && <Box sx={{ width: "100%", ml: 1 }} />}
      
      <ThemeToggle />
      <Notification />
      <Cart />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
