export const darkMode = {
  isDarkMode: true,
  colors: {
    error: "#E53E3E",
    success: "#48BB78",
    blue: "#2B6CB0",
    bgMain: "#2D3748",
    bgSecondary: "#1A202C",
    bgTertiary: "rgba(0, 0, 0, 0.1)",
    transparent: "rgba(0, 0, 0, 0)",
    textMain: "#fff",
    textSecondary: "#d1d2d5",
    hover: "#10141a",
    overlay: "rgba(0, 0, 0, 0.8)",
  },
  breakpoints: {
    xs: "(max-width: 425px)",
    sm: "(max-width: 768px)",
    md: "(max-width: 950px)",
  },
};

export const lightMode = {
  isDarkMode: false,
  colors: {
    error: "#E53E3E",
    success: "#48BB78",
    blue: "#3182CE",
    bgMain: "#fff", //E2E8F0
    bgSecondary: "#E2E8F0",
    bgTertiary: "#e6ebf2",
    transparent: "rgba(0, 0, 0, 0)",
    textMain: "#000",
    textSecondary: "#2D3748",
    hover: "#b5c1ce", //F7FAFC"
    overlay: "rgba(0, 0, 0, 0.8)",
  },
  breakpoints: {
    xs: "(max-width: 425px)",
    sm: "(max-width: 768px)",
    md: "(max-width: 950px)",
  },
};
