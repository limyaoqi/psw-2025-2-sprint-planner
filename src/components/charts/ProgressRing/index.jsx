import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import * as S from "./style";

/**
 * ProgressRing
 * Props:
 * - value: number (0-100)
 * - label?: string
 * - size?: number (px height of the chart container)
 */
export default function ProgressRing({
  value = 45,
  label = "Sprint Progress",
  size = 220,
}) {
  const theme = useTheme();

  const data = [{ name: "progress", value: Math.max(0, Math.min(100, value)) }];

  const gradientId = React.useId();

  return (
    <S.Wrapper style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          startAngle={90}
          endAngle={-270}
          innerRadius="70%"
          outerRadius="90%"
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme.palette.primary.main} />
              <stop offset="100%" stopColor={theme.palette.secondary.main} />
            </linearGradient>
          </defs>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={100}
            clockWise
            fill={`url(#${gradientId})`}
            background
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <S.Center>
        <S.Value>{Math.round(value)}%</S.Value>
        <S.Label>{label}</S.Label>
      </S.Center>
    </S.Wrapper>
  );
}
