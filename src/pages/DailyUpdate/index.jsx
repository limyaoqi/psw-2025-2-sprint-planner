import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Checkbox,
  Chip,
} from "@mui/material";
import SurfaceCard from "../../components/ui/SurfaceCard";
import PageTitle from "../../components/ui/PageTitle";
import * as S from "./style";
import { useToast } from "../../components/ui/ToastProvider";

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

export default function DailyUpdate() {
  const { showToast } = useToast();
  const today = React.useMemo(() => new Date(), []);
  const todayKey = ymd(today);

  const currentSprint = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("currentSprint");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Compute day number of sprint
  const sprintDay = React.useMemo(() => {
    if (!currentSprint?.start) return null;
    const start = new Date(currentSprint.start + "T00:00:00");
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff >= 1 ? diff : 1;
  }, [currentSprint, today]);

  const goals = currentSprint?.goals || [];

  // Load prior daily data if exists
  const initial = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("dailyUpdates");
      const all = raw ? JSON.parse(raw) : {};
      return all[todayKey] || null;
    } catch {
      return null;
    }
  }, [todayKey]);

  const [perGoal, setPerGoal] = React.useState(() => {
    const map = new Map();
    goals.forEach((g) => {
      map.set(g.id, {
        done: initial?.perGoal?.[g.id]?.done || false,
        hours: initial?.perGoal?.[g.id]?.hours ?? "",
        note: initial?.perGoal?.[g.id]?.note || "",
        focus: initial?.perGoal?.[g.id]?.focus || false,
      });
    });
    return map;
  });

  const [plan, setPlan] = React.useState(initial?.plan || "");

  // Enforce focus limit 1-3
  function toggleFocus(id) {
    setPerGoal((prev) => {
      const next = new Map(prev);
      const current = next.get(id) || { focus: false };
      const nextVal = !current.focus;
      if (nextVal) {
        const focusedCount = Array.from(next.values()).filter(
          (v) => v.focus
        ).length;
        if (focusedCount >= 3) return prev; // max 3
      }
      next.set(id, { ...current, focus: nextVal });
      return next;
    });
  }

  function setGoalField(id, field, value) {
    setPerGoal((prev) => {
      const next = new Map(prev);
      const current = next.get(id) || {};
      next.set(id, { ...current, [field]: value });
      return next;
    });
  }

  function save() {
    const perGoalObj = Object.fromEntries(perGoal.entries());
    const payload = {
      date: todayKey,
      sprintName: currentSprint?.name || "",
      sprintDay,
      perGoal: perGoalObj,
      plan,
    };
    try {
      const raw = localStorage.getItem("dailyUpdates");
      const all = raw ? JSON.parse(raw) : {};
      all[todayKey] = payload;
      localStorage.setItem("dailyUpdates", JSON.stringify(all));
      showToast("Daily update saved.", { severity: "success" });
    } catch {
      showToast("Failed to save daily update.", { severity: "error" });
    }
  }

  return (
    <S.Page>
      <PageTitle subtitle="Check in and reflect daily">
        Daily Update{typeof sprintDay === "number" ? ` · Day ${sprintDay}` : ""}
      </PageTitle>

      <S.Split>
        <SurfaceCard>
          <S.TallLeft>
            <Typography variant="h6" gutterBottom>
              Goals Today
            </Typography>
            <S.ScrollFill>
              <S.Goals>
                {goals.length === 0 && (
                  <S.Placeholder>
                    No goals found. Start a sprint first.
                  </S.Placeholder>
                )}
                {goals.map((g) => {
                  const state = perGoal.get(g.id) || {};
                  return (
                    <S.GoalItem key={g.id}>
                      <S.GoalRowTop>
                        <Checkbox
                          checked={!!state.done}
                          onChange={(e) =>
                            setGoalField(g.id, "done", e.target.checked)
                          }
                        />
                        <S.GoalTitle>{g.title}</S.GoalTitle>
                        <S.FieldSm>
                          <TextField
                            type="number"
                            label="Hours"
                            value={state.hours}
                            onChange={(e) =>
                              setGoalField(g.id, "hours", e.target.value)
                            }
                            inputProps={{ min: 0 }}
                            fullWidth
                          />
                        </S.FieldSm>
                        <Chip
                          size="small"
                          color={state.focus ? "primary" : "default"}
                          variant={state.focus ? "filled" : "outlined"}
                          label={state.focus ? "Focus" : "Set Focus"}
                          onClick={() => toggleFocus(g.id)}
                        />
                      </S.GoalRowTop>
                      <S.GoalRowBottom>
                        <TextField
                          label="Remark (optional)"
                          value={state.note || ""}
                          onChange={(e) =>
                            setGoalField(g.id, "note", e.target.value)
                          }
                          fullWidth
                          multiline
                          minRows={2}
                        />
                      </S.GoalRowBottom>
                    </S.GoalItem>
                  );
                })}
              </S.Goals>
            </S.ScrollFill>
          </S.TallLeft>
        </SurfaceCard>

        <SurfaceCard>
          <S.TallRight>
            <S.HeaderRow>
              <Typography variant="h6">Today's Plan (optional)</Typography>
              <Button variant="contained" onClick={save}>
                Save Daily Update
              </Button>
            </S.HeaderRow>
            <S.Fill>
              <TextField
                placeholder="What will you focus on today?"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                fullWidth
                multiline
                minRows={10}
                sx={{ flex: 1 }}
              />
            </S.Fill>
          </S.TallRight>
        </SurfaceCard>
      </S.Split>
    </S.Page>
  );
}
