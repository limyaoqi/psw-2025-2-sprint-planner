import * as React from "react";
import Typography from "@mui/material/Typography";
import * as S from "./style";

export default function PageTitle({ children, subtitle }) {
  return (
    <S.Wrapper>
      <Typography variant="h4">{children}</Typography>
      {subtitle ? <S.Subtitle variant="body2">{subtitle}</S.Subtitle> : null}
    </S.Wrapper>
  );
}
