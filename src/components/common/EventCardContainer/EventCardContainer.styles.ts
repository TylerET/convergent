import { styled } from "@chakra-ui/react";

export const ResponsiveGridContainer = styled("div", {
  baseStyle: {
    display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyItems: "center",
    width: "100%",
    maxWidth: "1200px",
  },
});
