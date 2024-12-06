import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { useTheme, Theme } from "@mui/material/styles";

interface ChartWrapperProps {
  children: ReactNode;
  title?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ children, title }) => {
  const theme = useTheme<Theme>();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: isDarkMode ? "grey.700" : "divider",
        borderRadius: 2,
        backgroundColor: isDarkMode ? "grey.900" : "background.paper",
        padding: 2,
        boxShadow: isDarkMode ? "none" : 3,
        "&:hover": {
          boxShadow: isDarkMode ? "0 0 10px rgba(255, 255, 255, 0.1)" : 4,
        },
        m: 2,
      }}
    >
      {title && (
        <Box
          sx={{
            marginBottom: 2,
            fontWeight: "bold",
            fontSize: "1.25rem",
            textAlign: "center",
            color: isDarkMode ? "grey.300" : "text.primary",
          }}
        >
          {title}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default ChartWrapper;
