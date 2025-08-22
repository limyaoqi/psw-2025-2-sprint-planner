import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import * as S from "./style";

/**
 * ProductivityLine
 * Props:
 * - data: Array<{ day: string; score: number }>
 * - height?: number
 */
export default function ProductivityLine({
  data = [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 72 },
    { day: "Wed", score: 58 },
    { day: "Thu", score: 76 },
    { day: "Fri", score: 70 },
    { day: "Sat", score: 54 },
    { day: "Sun", score: 60 },
  ],
  height = 260,
}) {
  const theme = useTheme();
  return (
    <S.ChartBox style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
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
          <Line
            type="monotone"
            dataKey="score"
            stroke="#F59E0B"
            strokeWidth={2.5}
            dot={{
              r: 2.5,
              stroke: theme.palette.background.paper,
              strokeWidth: 1,
            }}
            activeDot={{ r: 4 }}
            name="Productivity"
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartBox>
  );
}
