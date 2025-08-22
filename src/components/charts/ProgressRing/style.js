import { styling } from "../../../styles/styling";

export const Wrapper = styling("div")((props) => ({
  position: "relative",
  width: "100%",
}));

export const Center = styling("div")((props) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
}));

export const Value = styling("div")((props) => ({
  fontSize: 28,
  fontWeight: 700,
}));

export const Label = styling("div")((props) => ({
  fontSize: 12,
  color: props.theme.palette.text.secondary,
}));
