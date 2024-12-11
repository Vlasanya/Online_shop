import React, { useEffect, useState, MutableRefObject } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  // InputLabel,
  IconButton,
} from "@mui/material";
import { Product } from "@/store/reduser";
import { useAppState, useAppDispatch } from "@/store";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { fetchProducts, fetchCategories } from "@/services/api";
import Search from "./Search";
import ProductSort from "./ProductSort";
import CategorySelect from "./CategorySelect";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DisplayModeToggle from "@/components/productList/displayModeToggle";
import { SelectChangeEvent } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Switch, FormControlLabel } from "@mui/material";

const ProductList = ({
  initialProducts = [],
  initialError = null,
}: {
  initialProducts: Product[];
  initialError: string | null;
}) => {
  const { displayMode } = useAppState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [error, setError] = useState<string | null>(initialError);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [infiniteScrollMode, setInfiniteScrollMode] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const limitOptions = [5, 10, 15];
  const [limit, setLimit] = useState<number>(limitOptions[0]);

  const handleCardClick = (id: number) => {
    router.push(`/product/${id}`);
  };

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: page < totalPages,
    onLoadMore: () => {
      if (infiniteScrollMode) {
        setPage((prevPage) => prevPage + 1);
        loadProducts(page + 1, limit, true);
      }
    },
    disabled: !infiniteScrollMode || loading,
    rootMargin: "0px 0px 400px 0px",
  }) as [MutableRefObject<HTMLDivElement | null>];

  const loadProducts = async (page: number, limit: number, append = false) => {
    setLoading(true);
    try {
      const newProducts = await fetchProducts(
        limit,
        page,
        sort,
        currentCategory
      );
      const totalItems = 20;
      setTotalPages(Math.ceil(totalItems / limit));

      if (append) {
        setAllProducts((prev) => {
          const newSet = new Map(prev.map((p) => [p.id, p]));
          newProducts.forEach((p: Product) => newSet.set(p.id, p));
          return Array.from(newSet.values());
        });
        setProducts((prev) => {
          const newSet = new Map(prev.map((p) => [p.id, p]));
          newProducts.forEach((p: Product) => newSet.set(p.id, p));
          return Array.from(newSet.values());
        });
      } else {
        setProducts(newProducts);
        setAllProducts(newProducts);
      }
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
    loadProducts(1, limit);
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, sort, limit]);

  useEffect(() => {
    if (!infiniteScrollMode) {
      const start = (page - 1) * limit;
      setProducts(allProducts.slice(start, start + limit));
    } else {
      loadProducts(page, limit, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infiniteScrollMode]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (!infiniteScrollMode) {
      setPage(value);
      loadProducts(value, limit);
    }
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: { productId, quantity: 1 } });
  };

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
          <FormControlLabel
            control={
              <Switch
                checked={infiniteScrollMode}
                onChange={() => setInfiniteScrollMode(!infiniteScrollMode)}
              />
            }
            label="Infinite Scroll"
          />
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
              <IconButton
                color="primary"
                onClick={(event) => handleAddToCart(product.id, event)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
        {infiniteScrollMode && !loading && (
          <div ref={sentryRef} style={{ height: "1px" }} />
        )}
      </Box>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {!loading && !infiniteScrollMode && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              handlePageChange(event, value);
            }}
          />
          <FormControl size="small">
            {/* <InputLabel>Items per page</InputLabel> */}
            <Select value={limit} onChange={handleLimitChange}>
              {limitOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
