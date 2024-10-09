import { styled } from "@chakra-ui/react";

export const ResponsiveGridContainer = styled("div", {
  baseStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyItems: "start",
    width: "100%",
    maxWidth: "1200px",
  },
});
