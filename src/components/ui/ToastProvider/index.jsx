import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ToastContext = React.createContext({ showToast: () => {} });

export function useToast() {
  return React.useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [state, setState] = React.useState({
    open: false,
    message: "",
    severity: "info",
    duration: 3000,
  });

  const showToast = React.useCallback(
    (message, { severity = "info", duration = 3000 } = {}) => {
      setState({ open: true, message, severity, duration });
    },
    []
  );

  const handleClose = (_e, reason) => {
    if (reason === "clickaway") return;
    setState((s) => ({ ...s, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={state.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={state.severity}
          sx={(theme) => ({
            width: "100%",
            // soften the default info color to a neutral slate
            ...(state.severity === "info"
              ? {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#334155" : "#475569",
                  color: "#E2E8F0",
                }
              : {}),
          })}
        >
          {state.message}
        </MuiAlert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
