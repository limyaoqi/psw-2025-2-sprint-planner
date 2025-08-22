import * as React from "react";
import Paper from "@mui/material/Paper";
import * as S from "./style";

export default function SurfaceCard({ children, ...rest }) {
  return (
    <S.Card component={Paper} elevation={0} {...rest}>
      {children}
    </S.Card>
  );
}
