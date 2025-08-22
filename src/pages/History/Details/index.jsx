import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import SurfaceCard from "../../../components/ui/SurfaceCard";

const HistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const sprint = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("sprintHistory");
      const all = raw ? JSON.parse(raw) : [];
      return all[id] || null;
    } catch {
      return null;
    }
  }, [id]);

  if (!sprint) {
    return <Typography>No sprint found.</Typography>;
  }

  return (
    <SurfaceCard style={{ padding: 16 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Typography variant="h5" gutterBottom>
        {sprint.name || "Sprint"} (Ended:{" "}
        {new Date(sprint.date).toLocaleDateString()})
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Duration: {sprint.days || 0} days
      </Typography>

      <Typography variant="h6" gutterBottom>
        Goals
      </Typography>
      <List>
        {sprint.goals?.map((g, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={g.title}
              secondary={`Status: ${g.status} · Est: ${
                g.estHours || 0
              }h · Actual: ${g.actualHours || 0}h`}
            />
          </ListItem>
        ))}
      </List>

      {/* Reflections Section */}
      {sprint.reflections && (
        <>
          <Typography variant="h6" gutterBottom>
            Reflection
          </Typography>
          <List>
            <ListItem divider>
              <ListItemText
                primary="Went well"
                secondary={sprint.reflections?.wentWell || "—"}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Challenging"
                secondary={sprint.reflections?.challenging || "—"}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Do differently"
                secondary={sprint.reflections?.different || "—"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Rating"
                secondary={`${sprint.rating || "—"} ⭐`}
              />
            </ListItem>
          </List>
        </>
      )}
    </SurfaceCard>
  );
};

export default HistoryDetails;
