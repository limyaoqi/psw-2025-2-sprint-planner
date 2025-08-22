import * as React from "react";
import {
  Button,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import SurfaceCard from "../../components/ui/SurfaceCard";
import PageTitle from "../../components/ui/PageTitle";
import * as S from "./style";
import { useToast } from "../../components/ui/ToastProvider";
import { useNavigate } from "react-router-dom";

export default function SprintReview() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentSprint = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("currentSprint");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const [statusById, setStatusById] = React.useState(() => {
    const map = new Map();
    (currentSprint?.goals || []).forEach((g) => map.set(g.id, "pending"));
    return map;
  });
  const [actualHoursById, setActualHoursById] = React.useState(() => {
    const map = new Map();
    (currentSprint?.goals || []).forEach((g) => map.set(g.id, ""));
    return map;
  });

  const [wentWell, setWentWell] = React.useState("");
  const [challenging, setChallenging] = React.useState("");
  const [different, setDifferent] = React.useState("");
  const [rating, setRating] = React.useState(3);

  function completeSprint() {
    for (let [id, hours] of actualHoursById.entries()) {
      if (Number(hours) < 0) {
        alert("Actual hours cannot be negative.");
        return;
      }
    }

    const review = {
      date: new Date().toISOString(),
      name: currentSprint?.name || "Untitled Sprint",
      goals: (currentSprint?.goals || []).map((g) => ({
        id: g.id,
        title: g.title,
        estHours: g.hours,
        status: statusById.get(g.id) || "pending",
        actualHours: Number(actualHoursById.get(g.id) || 0),
      })),
      reflections: {
        wentWell,
        challenging,
        different,
      },
      rating: Number(rating),
    };

    try {
      const raw = localStorage.getItem("sprintHistory");
      const history = raw ? JSON.parse(raw) : [];
      history.unshift(review);
      localStorage.setItem("sprintHistory", JSON.stringify(history));
      localStorage.removeItem("currentSprint");
      showToast("Sprint completed and archived.", { severity: "success" });
    } catch {}
  }

  const totalGoals = currentSprint?.goals?.length || 0;
  const estTotal = (currentSprint?.goals || []).reduce(
    (s, g) => s + (Number(g.hours) || 0),
    0
  );

  return (
    <S.Page>
      <PageTitle subtitle="Summarize outcomes and learnings">
        Sprint Review
      </PageTitle>

      <S.Split>
        <SurfaceCard>
          <S.TallLeft>
            <Typography variant="h6">Sprint Overview</Typography>
            <S.MetricsRow>
              <Chip size="small" label={`Goals: ${totalGoals}`} />
              <Chip size="small" label={`Est. Hours: ${estTotal}`} />
            </S.MetricsRow>
            <S.ScrollFill>
              <S.GoalsList>
                {(currentSprint?.goals || []).length === 0 && (
                  <S.Placeholder>No goals to review.</S.Placeholder>
                )}
                {(currentSprint?.goals || []).length > 0 && (
                  <S.HeaderRow>
                    <Typography variant="caption" color="text.secondary">
                      Goal
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Est (h)
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Actual (h)
                    </Typography>
                  </S.HeaderRow>
                )}
                {(currentSprint?.goals || []).map((g) => (
                  <S.GoalRow key={g.id}>
                    <Typography variant="body2">{g.title}</Typography>
                    <Chip size="small" label={g.hours} />
                    <TextField
                      select
                      size="small"
                      label="Status"
                      value={statusById.get(g.id) || "pending"}
                      onChange={(e) =>
                        setStatusById((prev) =>
                          new Map(prev).set(g.id, e.target.value)
                        )
                      }
                      fullWidth
                    >
                      <MenuItem value="done">✅ Completed</MenuItem>
                      <MenuItem value="partial">⚠ Partial</MenuItem>
                      <MenuItem value="incomplete">❌ Not done</MenuItem>
                    </TextField>
                    <TextField
                      type="number"
                      size="small"
                      label="Actual (h)"
                      value={actualHoursById.get(g.id) || ""}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val < 0) {
                          showToast("Hours cannot be negative!", {
                            severity: "warning",
                          });
                          return; // don’t update state
                        }
                        setActualHoursById((prev) =>
                          new Map(prev).set(g.id, e.target.value)
                        );
                      }}
                      inputProps={{ min: 0 }}
                      fullWidth
                    />
                  </S.GoalRow>
                ))}
              </S.GoalsList>
            </S.ScrollFill>
          </S.TallLeft>
        </SurfaceCard>

        <SurfaceCard>
          <S.TallRight>
            <Typography variant="h6">Reflection</Typography>
            <S.ScrollFill>
              <Stack spacing={2}>
                <TextField
                  label="What went well?"
                  value={wentWell}
                  onChange={(e) => setWentWell(e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <TextField
                  label="What was challenging?"
                  value={challenging}
                  onChange={(e) => setChallenging(e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <TextField
                  label="What to do differently next time?"
                  value={different}
                  onChange={(e) => setDifferent(e.target.value)}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <TextField
                  select
                  label="Sprint rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <MenuItem key={r} value={r}>{`${r} ⭐`}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            </S.ScrollFill>
            {/* new added */}
            {currentSprint && (
              <Stack direction="row" gap={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    completeSprint();
                    navigate("/");
                  }}
                >
                  Complete Sprint
                </Button>
              </Stack>
            )}
          </S.TallRight>
        </SurfaceCard>
      </S.Split>
    </S.Page>
  );
}
