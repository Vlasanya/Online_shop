import React, { useEffect } from "react";
import { useAppState, useAppDispatch } from "@/store";
import { fetchCart, fetchProducts } from "@/services/api";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CardMedia,
} from "@mui/material";

const Cart: React.FC = () => {
  const { cart, token, users, products } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadCart = async () => {
      const loggedInUser = Array.isArray(users)
        ? users.find((user) => user.username === token)
        : null;
      if (!loggedInUser || !loggedInUser.id) {
        console.error("User ID is not available. Cannot fetch the cart.");
        return;
      }

      try {
        const cartData = await fetchCart(loggedInUser.id);
        dispatch({ type: "SET_CART", payload: cartData });
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    if (!cart) {
      loadCart();
    }
  }, [cart, token, users, dispatch]);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length === 0) {
        try {
          const productData = await fetchProducts(100, 1);
          dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: productData });
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      }
    };

    loadProducts();
  }, [products, dispatch]);

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const totalPrice = (cart?.products ?? []).reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (!cart || !Array.isArray(cart.products) || cart.products.length === 0) {
    return <Typography>No items in cart.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Cart</Typography>
      <List>
        {cart.products.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.productId);

          return (
            <ListItem key={cartItem.productId}>
              {product && (
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ width: 100, height: 100, mr: 2 }}
                />
              )}
              <ListItemText
                primary={product ? product.title : `Product ID: ${cartItem.productId}`}
                secondary={`Quantity: ${cartItem.quantity} ${
                  product ? `| Price: $${product.price}` : ""
                }`}
              />
              <Button
                onClick={() => handleRemoveFromCart(cartItem.productId)}
                color="secondary"
              >
                Remove
              </Button>
            </ListItem>
          );
        })}
      </List>
      <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
    </Box>
  );
};

export default Cart;
