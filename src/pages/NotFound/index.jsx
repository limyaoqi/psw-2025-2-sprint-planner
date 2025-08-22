import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import * as S from "./style";

export default function NotFound() {
  return (
    <S.Page>
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page not found</Typography>
      <Button variant="contained" component={RouterLink} to="/">
        Go Home
      </Button>
    </S.Page>
  );
}
