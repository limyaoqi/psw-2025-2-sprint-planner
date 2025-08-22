import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import * as S from "./style";

/**
 * DailyHoursBar
 * Props:
 * - data: Array<{ day: string; planned: number; actual: number }>
 * - height?: number
 */
export default function DailyHoursBar({
  data = [
    { day: "Mon", planned: 6, actual: 5 },
    { day: "Tue", planned: 6, actual: 7 },
    { day: "Wed", planned: 6, actual: 4 },
    { day: "Thu", planned: 6, actual: 6 },
    { day: "Fri", planned: 6, actual: 5 },
    { day: "Sat", planned: 4, actual: 3 },
    { day: "Sun", planned: 0, actual: 0 },
  ],
  height = 260,
}) {
  const theme = useTheme();
  return (
    <S.ChartBox style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey="day"
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <Tooltip
            contentStyle={{
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.primary,
            }}
          />
          <Legend wrapperStyle={{ color: theme.palette.text.secondary }} />
          <Bar
            dataKey="planned"
            fill="#60A5FA"
            name="Planned"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="actual"
            fill="#34D399"
            name="Actual"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartBox>
  );
}
