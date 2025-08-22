export const radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const shadows = {
  sm: "0 4px 12px rgba(0,0,0,0.18)",
  md: "0 8px 24px rgba(0,0,0,0.24)",
  lg: "0 16px 40px rgba(0,0,0,0.28)",
};

export const spacing = (v) => v * 8;

export const gradients = {
  primaryGlow:
    "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(245,158,11,0.18))",
  cardBorder:
    "linear-gradient(180deg, rgba(148,163,184,0.4), rgba(148,163,184,0.12))",
  appBgOverlay:
    "radial-gradient(1200px 600px at 20% -10%, rgba(56,189,248,0.12), rgba(56,189,248,0) 60%), radial-gradient(900px 500px at 80% -10%, rgba(245,158,11,0.10), rgba(245,158,11,0) 60%)",
};

export const blur = {
  sm: "6px",
  md: "10px",
};
