import React from "react";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import SearchOutlined from "@ant-design/icons/SearchOutlined";

export default function Search({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          placeholder="     ...Search by name"
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}
