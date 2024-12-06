import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { Product } from "@/store/reduser";
import { useAppState } from "@/store";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { fetchProducts, fetchCategories } from "@/services/api";
import Search from "./Search";
import ProductSort from "./ProductSort";
import CategorySelect from "./CategorySelect";

import DisplayModeToggle from "@/components/productList/displayModeToggle";

const ProductList = ({
  initialProducts = [],
  initialError = null,
}: {
  initialProducts: Product[];
  initialError: string | null;
}) => {
  const { displayMode } = useAppState();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [error, setError] = useState<string | null>(initialError);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const limit = 5;

  const handleCardClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const loadProducts = async (page: number) => {
    setLoading(true);
    try {
      const newProducts = await fetchProducts(
        limit,
        page,
        sort,
        currentCategory
      );
      setProducts(newProducts);

      const totalItems = 20;
      setTotalPages(Math.ceil(totalItems / limit));

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts(1);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, sort]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    loadProducts(value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const productStyle =
    displayMode === "list"
      ? styles.list
      : displayMode === "mediumTile"
      ? styles.mediumTile
      : styles.largeTile;

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Search onSearch={(query) => setSearchQuery(query)} />

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <DisplayModeToggle />
          <CategorySelect
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          <ProductSort sort={sort} setSort={setSort} />
        </Box>
      </Box>
      <Box className={styles.wrapper}>
        <Box className={productStyle}>
          {filteredProducts.map((product: Product) => (
            <Card
              key={`product-${product.id}`}
              className={styles.card}
              onClick={() => handleCardClick(product.id)}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                className={styles.media}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body1">${product.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {!loading && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3, display: "flex", justifyContent: "center" }}
        />
      )}
    </Box>
  );
};

export default ProductList;
