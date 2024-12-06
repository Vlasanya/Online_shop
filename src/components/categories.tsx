import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import { fetchCategories } from "../services/api";

type CategoriesProps = {
  onCategorySelect: (category: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setError(null);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <Button
        variant="contained"
        onClick={() => onCategorySelect("")}
        sx={{ textTransform: "none" }}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="contained"
          onClick={() => onCategorySelect(category)}
          sx={{ textTransform: "none" }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default Categories;
