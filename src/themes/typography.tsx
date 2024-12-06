import { TypographyVariants } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material";

export default function createTypography(
  fontFamily: string,
  palette: PaletteOptions
): Partial<TypographyVariants> {
  const primaryColor = palette.text?.primary || "#000000";
  const secondaryColor = palette.text?.secondary || "#666666";

  return {
    htmlFontSize: 16,
    fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: "2.375rem",
      lineHeight: 1.21,
      color: primaryColor,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: 1.27,
      color: primaryColor,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.33,
      color: primaryColor,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      color: primaryColor,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
      color: secondaryColor,
    },
    h6: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      color: secondaryColor,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      color: secondaryColor,
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
      color: secondaryColor,
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
      color: secondaryColor,
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
      color: primaryColor,
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
      color: secondaryColor,
    },
    overline: {
      lineHeight: 1.66,
      color: secondaryColor,
    },
    button: {
      textTransform: "capitalize",
      color: primaryColor,
    },
  };
}
