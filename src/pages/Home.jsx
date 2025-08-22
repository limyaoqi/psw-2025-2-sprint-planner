import * as React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const [items, setItems] = useLocalStorage("items", []);
  const [text, setText] = React.useState("");

  const addItem = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems([...items, { id: Date.now(), text: trimmed }]);
    setText("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addItem();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Local Items
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            label="Add item"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
          />
          <Button variant="contained" onClick={addItem}>
            Add
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 1 }}>
        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 2 }}>
            No items yet.
          </Typography>
        ) : (
          <List>
            {items.map((i) => (
              <ListItem
                key={i.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteItem(i.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={i.text} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
