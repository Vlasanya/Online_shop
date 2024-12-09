import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import { useAppState } from "@/store";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const Cart: React.FC = () => {
  const { isAuthenticated, cart } = useAppState();
  const router = useRouter();

  const handleCartClick = () => {
    if (isAuthenticated) {
      router.push("/cart");
    } else {
      alert("Please log in to view your cart.");
    }
  };

  const totalItemsInCart = (cart?.products ?? []).reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    
    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
      <Tooltip
        title={isAuthenticated ? "View your cart" : "Log in to access your cart"}
        arrow
      >
        <Badge
          badgeContent={isAuthenticated ? totalItemsInCart : undefined}
          color="primary"
          sx={{ ml: 2 }}
        >
          <ShoppingCartIcon onClick={handleCartClick} sx={{ cursor: "pointer" }} />
        </Badge>
      </Tooltip>
    </Box>
  );
};

export default Cart;
