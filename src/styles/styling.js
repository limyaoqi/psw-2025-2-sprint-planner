import { styled } from "@mui/material/styles";

// Wrapper to match the requested API: styling('tag')((props) => ({ ... }))
export const styling = (tagOrComponent, options) => (stylesOrFn) =>
  styled(
    tagOrComponent,
    options
  )((props) =>
    typeof stylesOrFn === "function" ? stylesOrFn(props) : stylesOrFn
  );

export default styling;

// Example usage component (can be imported where needed)
export const SpanStyled = styling("span")((props) => ({
  fontWeight: 700,
  fontSize: "1rem",
  color: "#00000099",
  [props.theme.breakpoints.down(768)]: {
    fontSize: "0.875rem",
  },
}));
