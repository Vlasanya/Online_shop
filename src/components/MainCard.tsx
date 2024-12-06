import React, { forwardRef, ReactNode } from "react";
// import { useTheme, Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentSX?: Record<string, unknown>;
  darkTitle?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: Record<string, unknown>;
  title?: ReactNode;
}

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      // border = true,
      // boxShadow,
      children,
      content = true,
      contentSX = {},
      darkTitle,
      elevation,
      secondary,
      // shadow,
      // sx = {},
      title,
      ...others
    },
    ref
  ) => {
    // const theme = useTheme<Theme>();
    // const resolvedBoxShadow =
    //   theme.palette.mode === "dark" ? boxShadow || true : boxShadow;

    return (
      <Box
        sx={{
          "& .MuiCard-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Card elevation={elevation || 0} ref={ref} {...others}>
          {!darkTitle && title && (
            <CardHeader
              sx={headerSX}
              titleTypographyProps={{ variant: "subtitle1" }}
              title={title}
              action={secondary}
            />
          )}
          {darkTitle && title && (
            <CardHeader
              sx={headerSX}
              title={<Typography variant="h3">{title}</Typography>}
              action={secondary}
            />
          )}

          {content && <CardContent sx={contentSX}>{children}</CardContent>}
          {!content && children}
        </Card>
      </Box>
    );
  }
);

MainCard.displayName = "MainCard";

export default MainCard;
