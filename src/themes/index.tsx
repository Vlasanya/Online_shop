import PropTypes from "prop-types";
import { ReactNode, useMemo } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  ThemeOptions,
} from "@mui/material";
import { useAppState } from "../store";

import createTypography from "./typography";
import CustomShadows from "./shadows";

interface ThemeCustomizationProps {
  children: ReactNode;
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { theme: currentTheme } = useAppState();

  const themeOptions: ThemeOptions = useMemo(() => {
    const basePalette = {
      mode: currentTheme,
      primary: { main: "#1976d2" },
      secondary: { main: "#a1a2a8" },
      background: {
        default: currentTheme === "dark" ? "#121212" : "#f4f4f4",
        paper: currentTheme === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: currentTheme === "dark" ? "#ffffff" : "#000000",
        secondary: currentTheme === "dark" ? "#bbbbbb" : "#444444",
      },
    };

    const typography = createTypography("'Public Sans', sans-serif", basePalette);
    const customShadows = CustomShadows(createTheme({ palette: basePalette }));

    return {
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      direction: "ltr",
      palette: basePalette,
      typography,
      customShadows,
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    };
  }, [currentTheme]);

  const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};
