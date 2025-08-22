import { styling } from "../../styles/styling";

export const Page = styling("div")({ padding: 16 });
export const Actions = styling("div")({ marginBottom: 16 });
export const Summary = styling("div")({
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 12,
});
export const Placeholder = styling("div")({ color: "#777" });

// Responsive two-column split similar to Daily Update
export const Split = styling("div")({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "2fr 1fr", // fluid columns like before
  },
});

export const Card = styling("div")((props) => ({
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 12,
  background: props.theme.palette.background.paper,
  padding: 16,
}));

export const GoalsList = styling("div")({ display: "grid", gap: 12 });

export const HeaderRow = styling("div")((props) => ({
  display: "grid",
  gridTemplateColumns: "1fr 100px 160px 120px",
  gap: 12,
  padding: "8px 12px",
  borderRadius: 10,
  background: props.theme.palette.background.default,
  border: `1px solid ${props.theme.palette.divider}`,
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

export const GoalRow = styling("div")((props) => ({
  display: "grid",
  gridTemplateColumns: "1fr 100px 160px 120px",
  alignItems: "center",
  gap: 12,
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 10,
  padding: 12,
  background: props.theme.palette.background.paper,
}));

export const TallLeft = styling("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  height: "auto",
  "@media (min-width: 900px)": { height: "70vh" },
  "@media (min-width: 1200px)": { height: "75vh" },
});

export const TallRight = styling("div")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  height: "auto",
  "@media (min-width: 900px)": { height: "70vh" },
  "@media (min-width: 1200px)": { height: "75vh" },
});

export const ScrollFill = styling("div")({
  flex: 1,
  overflowY: "auto",
  padding: 8,
});

export const MetricsRow = styling("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
});
