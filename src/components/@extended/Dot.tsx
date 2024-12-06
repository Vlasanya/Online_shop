import React from 'react';
import { useTheme, Theme, PaletteColor } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

type DotProps = {
  color?: keyof Theme['palette'];
  size?: number;
  variant?: 'outlined' | 'filled';
  sx?: SxProps<Theme>;
};

const Dot: React.FC<DotProps> = ({ color = 'primary', size = 8, variant = 'filled', sx }) => {
  const theme = useTheme();

  const isPaletteColor = (value: unknown): value is PaletteColor =>
    typeof value === 'object' && value !== null && 'main' in value;

  const mainColor = isPaletteColor(theme.palette[color]) 
    ? theme.palette[color].main 
    : theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: variant === 'outlined' ? 'transparent' : mainColor,
        ...(variant === 'outlined' && { border: `1px solid ${mainColor}` }),
        ...sx,
      }}
    />
  );
};

export default Dot;
