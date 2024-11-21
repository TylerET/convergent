import { styled } from "@chakra-ui/react";

export const ResponsiveGridContainer = styled("div", {
  baseStyle: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyItems: "start",
    width: "100%",
    maxWidth: "1200px",
  },
});
