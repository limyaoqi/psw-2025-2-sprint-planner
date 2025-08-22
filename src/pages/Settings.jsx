import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button,
  Stack,
} from "@mui/material";

export default function Settings() {
  const [username, setUsername] = useLocalStorage("username", "");

  const clearAll = () => {
    localStorage.clear();
    // force UI to reflect cleared value
    setUsername("");
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="Stored locally only"
          />
          <Button variant="outlined" color="error" onClick={clearAll}>
            Clear all local data
          </Button>
        </Stack>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        This is a single-user, local-only app. No backend and no authentication.
      </Typography>
    </Box>
  );
}
