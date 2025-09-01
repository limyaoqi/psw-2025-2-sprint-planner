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

import DailyHoursBar from "../../../components/charts/DailyHoursBar";
import ProductivityLine from "../../../components/charts/ProductivityLine";
import ProgressRing from "../../../components/charts/ProgressRing";
import { Stack } from "@mui/material"; // add this if not imported already

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

      {/* mini summarize */}
      {sprint && (
        <>
          {/* Reflections Dashboard */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Reflections Dashboard
          </Typography>

          <Stack direction="row" spacing={2}>
            <SurfaceCard sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Sprint Completion
              </Typography>
              <div style={{ height: 200 }}>
                <ProgressRing
                  value={(() => {
                    const total = sprint.goals?.length || 0;
                    const done = sprint.goals?.filter(
                      (g) => g.status?.toLowerCase() === "done"
                    ).length;
                    return total ? Math.round((done / total) * 100) : 0;
                  })()}
                />
              </div>
            </SurfaceCard>

            <SurfaceCard sx={{ flex: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Hours: Planned vs Actual
              </Typography>
              <div style={{ height: 250 }}>
                <DailyHoursBar
                  data={sprint.goals?.map((g) => ({
                    day: g.title, // show goal title instead of weekday
                    planned: Number(g.estHours) || 0,
                    actual: Number(g.actualHours) || 0,
                  }))}
                />
              </div>
            </SurfaceCard>
          </Stack>
          <SurfaceCard sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Weekly Productivity Trend
            </Typography>
            <div style={{ height: 250 }}>
              <ProductivityLine
                data={sprint.goals?.map((g, idx) => ({
                  day: `G${idx + 1}`, // you can also map to dates if stored
                  score: Number(g.actualHours) || 0,
                }))}
              />
            </div>
          </SurfaceCard>
        </>
      )}
    </SurfaceCard>
  );
};

export default HistoryDetails;
