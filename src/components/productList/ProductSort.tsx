import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

export default function ProductSort({
  sort,
  setSort,
}: {
  sort: "asc" | "desc";
  setSort: (value: "asc" | "desc") => void;
}) {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value as "asc" | "desc");
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="sort-select-label">Sort by</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
          label="Sort"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
