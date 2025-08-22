import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Page not found
      </Typography>
      <Button variant="contained" component={RouterLink} to="/" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
}
