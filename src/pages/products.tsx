import React from "react";
import ProductList from "../components/productList";
import { fetchProducts } from "../services/api";
import { GetServerSideProps } from "next";
import Typography from "@mui/material/Typography";

import { Product } from "../store/reduser";

export type HomeProps = {
  products?: Product[];
  error?: string | null;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const limit = 5;
  const page = 1;

  try {
    const products: Product[] = await fetchProducts(limit, page);
    return { props: { products, error: null } };
  } catch (err) {
    console.error(err); 
    return { props: { products: [], error: "Failed to fetch products" } };
  }
};

export default function Products({ products = [], error = null }: HomeProps) {
  return (
    <>
      <Typography variant="h2">Products</Typography>
      <ProductList initialProducts={products} initialError={error} />
    </>
  );
}
