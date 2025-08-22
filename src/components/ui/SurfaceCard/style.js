import { styling } from "../../../styles/styling";
import { radii, shadows } from "../../../styles/tokens";

export const Card = styling("div")((props) => ({
  borderRadius: radii.lg,
  backgroundColor: props.theme.palette.background.paper,
  border: `1px solid ${props.theme.palette.divider}`,
  boxShadow: shadows.md,
  padding: 16,
}));
