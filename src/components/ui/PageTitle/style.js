import { styling } from "../../../styles/styling";

export const Wrapper = styling("div")({ marginBottom: 16 });
export const Subtitle = styling("div")((props) => ({
  color: props.theme.palette.text.secondary,
}));
