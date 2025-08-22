import { styling } from "../../styles/styling";

export const Page = styling("div")({ padding: 16 });
export const Actions = styling("div")({
  display: "flex",
  gap: 8,
  marginBottom: 16,
  flexWrap: "wrap",
});
export const Section = styling("div")({
  border: "1px solid #eee",
  borderRadius: 8,
  padding: 12,
});
export const Placeholder = styling("div")((props) => ({
  color: "#777",
  fontSize: "0.95rem",
  [props.theme.breakpoints.down(768)]: { fontSize: "0.875rem" },
}));

// Equal height chart cards row
export const RowEqual = styling("div")({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  alignItems: "stretch",
  // md and up -> 2 columns
  "@media (min-width: 900px)": {
    gridTemplateColumns: "1fr 2fr",
  },
});

export const ChartFixed = styling("div")({
  height: 280,
});

// Kanban styles (read-only board)
export const Kanban = styling("div")({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

export const Column = styling("div")((props) => ({
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 12,
  minHeight: 220,
  background: props.theme.palette.background.default,
}));

export const ColumnHeader = styling("div")((props) => ({
  padding: 12,
  fontWeight: 600,
  borderBottom: `1px solid ${props.theme.palette.divider}`,
}));

export const Items = styling("div")({ padding: 12, display: "grid", gap: 8 });

export const GoalCard = styling("div")((props) => ({
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 10,
  padding: 12,
  background: props.theme.palette.background.paper,
}));

export const GoalHeader = styling("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
});

export const Meta = styling("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
});

export const PriorityTag = styling("span")((props) => ({
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  backgroundColor: "rgba(56, 189, 248, 0.18)",
  color: "#38BDF8",
  "&[data-priority='High']": {
    backgroundColor: "rgba(245, 158, 11, 0.18)",
    color: "#F59E0B",
  },
  "&[data-priority='Low']": {
    backgroundColor: "rgba(34, 197, 94, 0.18)",
    color: "#22C55E",
  },
}));
