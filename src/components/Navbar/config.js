import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import FlagCircleRoundedIcon from "@mui/icons-material/FlagCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

export const navItems = [
    {
        id: "sprint-new",
        name: "Sprint Setup",
        path: "/sprint/new",
        icon: AddCircleOutlineRoundedIcon,
    },
    { id: "daily", name: "Daily Update", path: "/daily", icon: TodayRoundedIcon },
    { id: "dashboard", name: "Dashboard", path: "/", icon: DashboardRoundedIcon },
    {
    id: "sprint-review",
    name: "Sprint Review",
    path: "/sprint/review",
    icon: FlagCircleRoundedIcon,
  },
  {
    id: "history",
    name: "History",
    path: "/history",
    icon: HistoryRoundedIcon,
  },
];
