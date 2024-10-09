import { styled } from "@chakra-ui/react";

export const StyledDiv = styled("div", {
  baseStyle: {
    boxSizing: "border-box",
    backgroundColor: "#F2E5BF",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    overflow: "auto",
  },
});

export const GridContainer = styled("div", {
  baseStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyItems: "center",
    width: "100%",
    maxWidth: "1200px",
  },
});
