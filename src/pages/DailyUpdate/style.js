import { styling } from "../../styles/styling";

export const Page = styling("div")({ padding: 16 });
export const Form = styling("form")({});
export const Actions = styling("div")({ display: "flex", gap: 8 });
export const Progress = styling("div")({
  marginTop: 16,
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 12,
});
export const Placeholder = styling("div")({ color: "#777" });

// New styles for goals list
export const Goals = styling("div")({ display: "grid", gap: 12 });

// Responsive two-column split for Goals (left) and Plan (right)
export const Split = styling("div")({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "2fr 1fr",
  },
});

// Scroll area for long goal lists
// Tall card containers with fill scrolling on larger screens
export const TallLeft = styling("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  height: "auto",
  "@media (min-width: 900px)": { height: "70vh" },
  "@media (min-width: 1200px)": { height: "75vh" },
});

export const TallRight = styling("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  height: "auto",
  "@media (min-width: 900px)": { height: "70vh" },
  "@media (min-width: 1200px)": { height: "75vh" },
});

export const HeaderRow = styling("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

export const ScrollFill = styling("div")({
  flex: 1,
  overflowY: "auto",
  paddingLeft: 8,
  paddingRight: 8,
  paddingBottom: 8,
});

export const Fill = styling("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

export const GoalItem = styling("div")((props) => ({
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 10,
  padding: 12,
  background: props.theme.palette.background.paper,
}));

export const GoalRowTop = styling("div")({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto auto",
  alignItems: "center",
  gap: 12,
});

export const GoalTitle = styling("div")({ fontWeight: 600 });

export const FieldSm = styling("div")({ width: 140 });

export const GoalRowBottom = styling("div")({
  marginTop: 8,
});
