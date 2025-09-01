import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Stack } from "@mui/material";
import * as S from "./style";
import PageTitle from "../../components/ui/PageTitle";
import SurfaceCard from "../../components/ui/SurfaceCard";
import ProgressRing from "../../components/charts/ProgressRing";
import DailyHoursBar from "../../components/charts/DailyHoursBar";
import ProductivityLine from "../../components/charts/ProductivityLine";

import { useLocation } from "react-router-dom";

export default function Dashboard() {
  // Load current sprint if present
  const currentSprint = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("currentSprint");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Helpers
  const toYmd = (d) => d.toISOString().slice(0, 10);
  const parseYmd = (s) => new Date(`${s}T00:00:00`);

  // Compute progress and charts from localStorage
  const { sprintProgress, hoursData, productivity } = React.useMemo(() => {
    if (!currentSprint)
      return { sprintProgress: 0, hoursData: [], productivity: [] };
    const goals = currentSprint.goals || [];

    const order = currentSprint?.order || { todo: [], inprogress: [], done: [] };
    const done = order.done.length;
    const total = currentSprint?.goals?.length || 0;
    const progress = total ? Math.round((done / total) * 100) : 0;


    const days = Number(currentSprint.days) || 7;
    const start = parseYmd(currentSprint.start);
    const dates = Array.from({ length: days }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });

    // Aggregate actual hours per day from dailyUpdates
    let dailyUpdates = {};
    try {
      const raw = localStorage.getItem("dailyUpdates");
      dailyUpdates = raw ? JSON.parse(raw) : {};
    } catch {}

    const totalEst = goals.reduce((s, g) => s + (Number(g.hours) || 0), 0);
    const plannedPerDay = days ? totalEst / days : 0;

    console.log(totalEst, plannedPerDay);

    const hoursData = dates.map((d) => {
      const key = toYmd(d);
      const perGoal = dailyUpdates[key]?.perGoal || {};
      const actual = Object.values(perGoal).reduce(
        (s, v) => s + (Number(v.hours) || 0),
        0
      );
      const dayLabel = d.toLocaleDateString(undefined, { weekday: "short" });
      return {
        day: dayLabel,
        planned: Math.round(plannedPerDay),
        actual: actual,
      };
    });

    const productivity = dates.map((d) => {
      const key = toYmd(d);
      const perGoal = dailyUpdates[key]?.perGoal || {};
      const actual = Object.values(perGoal).reduce(
        (s, v) => s + (Number(v.hours) || 0),
        0
      );
      const dayLabel = d.toLocaleDateString(undefined, { weekday: "short" });
      return { day: dayLabel, score: actual };
    });

    return { sprintProgress: progress, hoursData, productivity };
  }, [currentSprint]);

  const kanbanColumns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];
  const order = currentSprint?.order || { todo: [], inprogress: [], done: [] };
  const goalsById = React.useMemo(() => {
    const map = new Map();
    (currentSprint?.goals || []).forEach((g) => map.set(g.id, g));
    return map;
  }, [currentSprint]);

  console.log("hoursData", hoursData);


  return (
    <S.Page>
      <PageTitle subtitle="Track progress and manage your sprints">
        Dashboard
      </PageTitle>

      <Stack spacing={2}>
        <SurfaceCard>
          <S.Actions>
            {currentSprint ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Typography variant="h6">
                  Current Sprint: {currentSprint.name || "Untitled"}
                </Typography>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="contained" component={Link} to="/daily">
                    Daily Check-in
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/sprint/review"
                  >
                    Review
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Typography variant="h6">
                  No active sprint. Start a new one!
                </Typography>
                <Button variant="contained" component={Link} to="/sprint/new">
                  New Sprint
                </Button>
              </div>
            )}
          </S.Actions>
        </SurfaceCard>

        {/* Equal-height top row */}
        <S.RowEqual>
          <SurfaceCard>
            <Typography variant="h6" gutterBottom>
              Sprint Completion
            </Typography>
            <S.ChartFixed>
              <ProgressRing value={sprintProgress} />
            </S.ChartFixed>
          </SurfaceCard>

          <SurfaceCard>
            <Typography variant="h6" gutterBottom>
              Hours: Planned vs Actual
            </Typography>
            <S.ChartFixed>
              <DailyHoursBar data={hoursData} />
            </S.ChartFixed>
          </SurfaceCard>
        </S.RowEqual>

        {/* Kanban board replaces trend section; Trend moved below */}
        <SurfaceCard>
          <Typography variant="h6" gutterBottom>
            Kanban
          </Typography>
          <S.Kanban>
            {kanbanColumns.map((col) => {
              const ids = order[col.id] || [];
              const count = ids.length;
              return (
                <S.Column key={col.id}>
                  <S.ColumnHeader>
                    {col.title} ({count})
                  </S.ColumnHeader>
                  <S.Items>
                    {ids.length === 0 && (
                      <S.Placeholder>No items</S.Placeholder>
                    )}
                    {ids.map((id) => {
                      const g = goalsById.get(id);
                      if (!g) return null;
                      return (
                        <S.GoalCard key={g.id}>
                          <S.GoalHeader>
                            <Typography variant="subtitle2">
                              {g.title}
                            </Typography>
                            <S.PriorityTag data-priority={g.priority}>
                              {g.priority}
                            </S.PriorityTag>
                          </S.GoalHeader>
                          <S.Meta>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {g.hours}h
                            </Typography>
                          </S.Meta>
                        </S.GoalCard>
                      );
                    })}
                  </S.Items>
                </S.Column>
              );
            })}
          </S.Kanban>
        </SurfaceCard>

        <SurfaceCard>
          <Typography variant="h6" gutterBottom>
            Weekly Productivity Trend
          </Typography>
          <ProductivityLine data={productivity} />
        </SurfaceCard>
      </Stack>
    </S.Page>
  );
}
