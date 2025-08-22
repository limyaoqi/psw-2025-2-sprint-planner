import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App/index";
import Dashboard from "./pages/Dashboard/index";
import SprintSetup from "./pages/SprintSetup/index";
import DailyUpdate from "./pages/DailyUpdate/index";
import SprintReview from "./pages/SprintReview/index";
import History from "./pages/History/index";
import NotFound from "./pages/NotFound/index";
import HistoryDetails from "./pages/History/Details/index"; // new added for history details
import { gradients } from "./styles/tokens";
import ToastProvider from "./components/ui/ToastProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "sprint/new", element: <SprintSetup /> },
      { path: "daily", element: <DailyUpdate /> },
      { path: "sprint/review", element: <SprintReview /> },
      { path: "history", element: <History /> },
      { path: "*", element: <NotFound /> },
      { path: "history/:id", element: <HistoryDetails /> }, // new added for history details
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#38BDF8" }, // 青蓝
    secondary: { main: "#F59E0B" }, // 橙色 (accent)
    background: { default: "#0F172A", paper: "#1E293B" }, // 深灰 + 卡片
    text: { primary: "#F9FAFB", secondary: "#9CA3AF" }, // 文本颜色
    divider: "rgba(148,163,184,0.24)",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0F172A",
          color: "#F9FAFB",
          backgroundImage: gradients.appBgOverlay,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
