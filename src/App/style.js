import { styling } from "../styles/styling";

export const Root = styling("div")({ minHeight: "100vh" });
export const Content = styling("div")({
  padding: 16,
  // Reserve safe space for the fixed bottom Navbar so content isn't obscured
  paddingBottom: 90,
});
