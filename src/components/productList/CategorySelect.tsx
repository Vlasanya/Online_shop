import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function CategorySelect({
  categories,
  currentCategory,
  setCurrentCategory,
}: {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (value: string) => void;
}) {
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={currentCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          {/* "All" option */}
          <MenuItem value="">All</MenuItem>
          {/* Dynamically render categories */}
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
