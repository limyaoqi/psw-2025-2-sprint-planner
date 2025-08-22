import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styling } from "../../styles/styling";
import { radii, shadows, gradients, blur } from "../../styles/tokens";

export const NavContainer = styling(Paper)((props) => ({
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 28,
  padding: "8px 10px",
  borderRadius: radii.pill,
  display: "flex",
  alignItems: "center",
  gap: 6,
  zIndex: 1200,
  boxShadow: shadows.lg,
  backdropFilter: `blur(${blur.md})`,
  border: "1px solid white",
  WebkitBackdropFilter: `blur(${blur.md})`,
  backgroundImage: `linear-gradient(${props.theme.palette.background.paper}, ${props.theme.palette.background.paper}), ${gradients.cardBorder}`,
  backgroundClip: "padding-box, border-box",
  maxWidth: "calc(100% - 32px)",
  overflowX: "auto",
}));

export const NavButtons = styling(Box)((props) => ({
  display: "flex",
  gap: 6,
}));

export const NavButton = styling(Button, {
  shouldForwardProp: (prop) => prop !== "data-active",
})((props) => ({
  textTransform: "none",
  fontWeight: props["data-active"] ? 700 : 600,
  borderRadius: radii.pill,
  paddingInline: 12,
  color: props.theme.palette.text.primary,
  minWidth: 0,
  paddingBlock: 8,
  transition: "all 180ms ease",
  ...(props["data-active"] && {
    backgroundImage: `linear-gradient(135deg, ${props.theme.palette.primary.main}, ${props.theme.palette.secondary.main})`,
    color: props.theme.palette.background.default,
    boxShadow: shadows.sm,
  }),
  "&:hover": {
    backgroundColor: props["data-active"]
      ? "transparent"
      : "rgba(148,163,184,0.12)",
  },
  "&:focus-visible": {
    boxShadow: `${shadows.sm}, 0 0 0 2px rgba(56,189,248,0.35)`,
    outline: "none",
  },
  [props.theme.breakpoints.down("sm")]: {
    paddingInline: 10,
  },
}));

export const Label = styling("span")((props) => ({
  marginLeft: 8,
  letterSpacing: 0.2,
  [props.theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
