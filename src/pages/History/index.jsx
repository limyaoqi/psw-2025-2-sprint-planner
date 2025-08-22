import * as React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import SurfaceCard from "../../components/ui/SurfaceCard";
import PageTitle from "../../components/ui/PageTitle";
import * as S from "./style";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const history = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("sprintHistory");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const stats = React.useMemo(() => {
    if (!history.length) return { avgCompletion: 0, avgHours: 0 };
    let totalCompletion = 0;
    let totalHours = 0;
    history.forEach((s) => {
      const goals = s.goals || [];
      const done = goals.filter((g) => g.status === "done").length;
      const completion = goals.length ? (done / goals.length) * 100 : 0;
      totalCompletion += completion;
      totalHours += goals.reduce(
        (sum, g) => sum + (Number(g.actualHours) || 0),
        0
      );
    });
    return {
      avgCompletion: Math.round(totalCompletion / history.length),
      avgHours: Math.round(totalHours / history.length),
    };
  }, [history]);

  return (
    <S.Page>
      <PageTitle subtitle="All past sprints and stats">History</PageTitle>

      <SurfaceCard>
        <Typography variant="h6" gutterBottom>
          Basic Stats
        </Typography>
        {history.length === 0 ? (
          <S.Placeholder>No completed sprints yet.</S.Placeholder>
        ) : (
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Chip label={`Avg Completion: ${stats.avgCompletion}%`} />
            <Chip label={`Avg Hours: ${stats.avgHours}h`} />
          </Stack>
        )}
      </SurfaceCard>

      <SurfaceCard style={{ marginTop: 16 }}>
        <Typography variant="h6" gutterBottom>
          Past Sprints
        </Typography>
        {history.length === 0 ? (
          <S.Placeholder>No history yet.</S.Placeholder>
        ) : (
          <List>
            {history.map((s, idx) => {
              const goals = s.goals || [];
              const done = goals.filter((g) => g.status === "done").length;
              const completion = goals.length
                ? Math.round((done / goals.length) * 100)
                : 0;
              const hours = goals.reduce(
                (sum, g) => sum + (Number(g.actualHours) || 0),
                0
              );
              const date = new Date(s.date).toLocaleDateString();
              return (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={`${s.name || "Sprint"} · ${date}`}
                    secondary={`Completion: ${completion}% · Total hours: ${hours}h`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/history/${idx}`)} // go to details (new added) 
                    >
                      Details
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </SurfaceCard>
    </S.Page>
  );
}
