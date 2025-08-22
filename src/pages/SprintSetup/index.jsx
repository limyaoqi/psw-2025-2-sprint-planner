import * as React from "react";
import { TextField, Button, Typography, Stack, MenuItem } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import SurfaceCard from "../../components/ui/SurfaceCard";
import * as S from "./style";

function toYmd(d) {
  return d.toISOString().slice(0, 10);
}

export default function SprintSetup() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [start, setStart] = React.useState(toYmd(new Date()));
  const [days, setDays] = React.useState(7);
  const [goals, setGoals] = React.useState([]);
  const [order, setOrder] = React.useState({
    todo: [],
    inprogress: [],
    done: [],
  });
  const startInputRef = React.useRef(null);
  const [draftGoal, setDraftGoal] = React.useState({
    title: "",
    hours: 2,
    priority: "Medium",
  });

  const end = React.useMemo(() => {
    const d = new Date(start);
    d.setDate(d.getDate() + Number(days));
    return d;
  }, [start, days]);

  function addGoal() {
    if (!draftGoal.title.trim()) return;
    const id = `${Date.now()}`;
    const newGoal = {
      id,
      title: draftGoal.title.trim(),
      hours: Number(draftGoal.hours) || 0,
      priority: draftGoal.priority,
      status: "todo",
    };
    setGoals((prev) => [...prev, newGoal]);
    setOrder((prev) => ({ ...prev, todo: [...prev.todo, id] }));
    setDraftGoal({ title: "", hours: 2, priority: "Medium" });
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const from = source.droppableId;
    const to = destination.droppableId;
    if (from === to && destination.index === source.index) return;

    setOrder((prev) => {
      const next = { ...prev, [from]: [...prev[from]], [to]: [...prev[to]] };
      // remove from source
      const fromIdx = next[from].indexOf(draggableId);
      if (fromIdx !== -1) next[from].splice(fromIdx, 1);
      // insert into destination at index
      next[to].splice(destination.index, 0, draggableId);
      return next;
    });

    if (from !== to) {
      setGoals((prev) =>
        prev.map((g) => (g.id === draggableId ? { ...g, status: to } : g))
      );
    }
  }

  function startSprint() {
    const sprint = {
      name: name || "Untitled Sprint",
      start,
      days: Number(days),
      end: toYmd(end),
      goals,
      order,
    };
    try {
      localStorage.setItem("currentSprint", JSON.stringify(sprint));
    } catch {}
    navigate("/");
  }

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  const goalsById = React.useMemo(() => {
    const map = new Map();
    goals.forEach((g) => map.set(g.id, g));
    return map;
  }, [goals]);

  return (
    <S.Page>
      <PageTitle subtitle="Define scope, dates and goals">New Sprint</PageTitle>

      <Stack spacing={2}>
        <S.TwoCol>
          <SurfaceCard>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Sprint Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Start Date"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputRef={startInputRef}
                onClick={() => startInputRef.current?.showPicker?.()}
                sx={{
                  "& input": { colorScheme: "dark" },
                  "& input::-webkit-calendar-picker-indicator": {
                    filter: "invert(1)",
                    opacity: 1,
                  },
                }}
              />
              <TextField
                type="number"
                label="Duration (days)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                inputProps={{ min: 1, max: 30 }}
                fullWidth
              />
              <TextField
                label="End Date"
                value={toYmd(end)}
                InputProps={{ readOnly: true }}
              />
            </Stack>
          </SurfaceCard>

          <SurfaceCard>
            <Typography variant="h6" gutterBottom>
              Add Goals
            </Typography>
            <S.Row>
              <S.Grow>
                <TextField
                  label="Goal Description"
                  fullWidth
                  value={draftGoal.title}
                  onChange={(e) =>
                    setDraftGoal((d) => ({ ...d, title: e.target.value }))
                  }
                />
              </S.Grow>
              <S.FieldSm>
                <TextField
                  type="number"
                  label="Estimated Hours"
                  value={draftGoal.hours}
                  onChange={(e) =>
                    setDraftGoal((d) => ({ ...d, hours: e.target.value }))
                  }
                  inputProps={{ min: 0 }}
                  fullWidth
                />
              </S.FieldSm>
              <S.FieldSm>
                <TextField
                  select
                  label="Priority"
                  value={draftGoal.priority}
                  onChange={(e) =>
                    setDraftGoal((d) => ({ ...d, priority: e.target.value }))
                  }
                  fullWidth
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </S.FieldSm>
              <Button variant="contained" onClick={addGoal}>
                Add
              </Button>
            </S.Row>
          </SurfaceCard>
        </S.TwoCol>

        <SurfaceCard>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">Goals Board</Typography>
            <Button variant="contained" onClick={startSprint}>
              Start Sprint
            </Button>
          </Stack>
          <DragDropContext onDragEnd={onDragEnd}>
            <S.Kanban>
              {columns.map((col) => {
                const ids = order[col.id] || [];
                const count = ids.length;
                return (
                  <Droppable droppableId={col.id} key={col.id}>
                    {(provided, snapshot) => (
                      <S.Column data-over={snapshot.isDraggingOver ? 1 : 0}>
                        <S.ColumnHeader>
                          {col.title} ({count})
                        </S.ColumnHeader>
                        <S.Items
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {ids.map((id, index) => {
                            const g = goalsById.get(id);
                            if (!g) return null;
                            return (
                              <Draggable
                                key={g.id}
                                draggableId={g.id}
                                index={index}
                              >
                                {(dragProvided) => (
                                  <S.GoalCard
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    {...dragProvided.dragHandleProps}
                                  >
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
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </S.Items>
                      </S.Column>
                    )}
                  </Droppable>
                );
              })}
            </S.Kanban>
          </DragDropContext>
        </SurfaceCard>
      </Stack>
    </S.Page>
  );
}
