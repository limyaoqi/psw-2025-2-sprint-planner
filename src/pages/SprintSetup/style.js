import { styling } from "../../styles/styling";

export const Page = styling("div")({ padding: 16 });
export const Form = styling("form")({});
export const Actions = styling("div")({ display: "flex", gap: 8 });

export const Grid = styling("div")({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

export const Card = styling("div")((props) => ({
  border: `1px solid ${props.theme.palette.divider}`,
  borderRadius: 12,
  background: props.theme.palette.background.paper,
  padding: 16,
}));

export const Row = styling("div")({
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
});
export const Grow = styling("div")({ flex: 1, minWidth: 220 });
export const FieldSm = styling("div")({ width: 160 });

// Two-column responsive container used above the board
export const TwoCol = styling("div")({
  display: "grid",
  gap: 16,
  gridTemplateColumns: "1fr",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

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
  minHeight: 260,
  background: props.theme.palette.background.default,
  transition: "border-color 160ms ease, background-color 160ms ease",
  "&[data-over='1']": {
    borderColor: props.theme.palette.primary.main,
    backgroundColor: props.theme.palette.action.hover,
  },
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
  transition: "box-shadow 160ms ease, transform 160ms ease",
  "&:hover": {
    boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
    transform: "translateY(-1px)",
  },
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
  backgroundColor:
    props["data-priority"] === "High"
      ? "rgba(245, 158, 11, 0.18)"
      : props["data-priority"] === "Low"
      ? "rgba(34, 197, 94, 0.18)"
      : "rgba(56, 189, 248, 0.18)",
  color:
    props["data-priority"] === "High"
      ? "#F59E0B"
      : props["data-priority"] === "Low"
      ? "#22C55E"
      : "#38BDF8",
}));
