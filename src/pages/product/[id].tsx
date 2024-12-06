import React from "react";
import { GetServerSideProps } from "next";
import { Product } from "../../store/reduser";
import { fetchProducts } from "../../services/api";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

type ProductDetailProps = {
  product: Product | null;
  error: string | null;
};

export const getServerSideProps: GetServerSideProps<
  ProductDetailProps
> = async (context) => {
  const { id } = context.params!;
  const limit = 5;
  const page = 1;

  try {
    const products = await fetchProducts(limit, page);
    const product =
      products.find((p: Product) => p.id === parseInt(id as string)) || null;

    if (!product) {
      return { notFound: true };
    }

    return { props: { product, error: null } };
  } catch (err) {
    console.error(err); 
    return {
      props: { product: null, error: "Failed to fetch product details" },
    };
  }
};

const ProductDetail = ({ product, error }: ProductDetailProps) => {
    const router = useRouter();
  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleGoBack}
        sx={{ marginBottom: 2 }}
      >
        Go Back
      </Button>
      <Card>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ height: 400, objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {product.description}
          </Typography>
          <Box
            sx={{ marginTop: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Rating value={product.rating.rate} readOnly precision={0.1} />
            <Typography variant="body2" color="text.secondary">
              ({product.rating.rate} out of 5, {product.rating.count} reviews)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
