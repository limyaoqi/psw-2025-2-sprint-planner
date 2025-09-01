import * as React from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  duration,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/ui/PageTitle";
import SurfaceCard from "../../components/ui/SurfaceCard";
import * as S from "./style";

// new added
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useToast } from "../../components/ui/ToastProvider";

function toYmd(d) {
  return d.toISOString().slice(0, 10);
}

export default function SprintSetup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
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
    if (!draftGoal.title.trim()) {
      showToast("Please enter goal description.", { severity: "warning" }); // new added
      return;
    }

    //  Prevent duplicate titles (case-insensitive)
    const duplicate = goals.some(
      (g) => g.title.toLowerCase() === draftGoal.title.trim().toLowerCase()
    );
    if (duplicate) {
      showToast("A goal with this title already exists.", {
        severity: "warning",
      });
      return;
    }

    //  Enforce max length (e.g., 50 chars)
    if (draftGoal.title.trim().length > 50) {
      showToast("Goal title must be 50 characters or less.", {
        severity: "warning",
      });
      return;
    }

    if (draftGoal.hours < 0) {
      showToast("Estimated hours cannot be negative.", { severity: "warning" }); // new added
      return;
    }

    const maxHours = Number(days) * 24;
    if (draftGoal.hours > maxHours) {
      showToast("Exceeded expected finish days.", { severity: "warning" }); // new added
      return;
    }

    const id = `${Date.now()}`;
    const newGoal = {
      id,
      title: draftGoal.title.trim(),
      hours: Number(draftGoal.hours) || 2,
      priority: draftGoal.priority,
      status: "todo",
    };
    setGoals((prev) => [...prev, newGoal]);
    setOrder((prev) => ({ ...prev, todo: [id, ...prev.todo] }));
    setDraftGoal({ title: "", hours: 2, priority: "Medium" });
  }

  // delete goal function (new added)
  function removeGoal(id) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    setOrder((prev) => {
      const next = { ...prev };
      for (const col of Object.keys(next)) {
        next[col] = next[col].filter((gid) => gid !== id);
      }
      return next;
    });
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
    // start date validation (new added)
    const today = toYmd(new Date());
    if (start < today) {
      showToast(`Please select a valid start date (${today} or later).`, {
        severity: "error",
      });
      return;
    }

    if (end < today) {
      showToast("End date cannot be before today.", { severity: "error" });
      return;
    }

    // new added
    if (goals.length === 0) {
      showToast("Please add at least one goal before starting a sprint.", {
        severity: "warning",
      });
      return;
    }

    if (name.trim().length > 50) {
      showToast("Sprint name must be 50 characters or less.", {
        severity: "warning",
      });
      return;
    }

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
      if (localStorage.getItem("dailyUpdates")) {
        localStorage.removeItem("dailyUpdates");
      }
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
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.trim().length > 50) {
                    showToast("Sprint name cannot exceed 50 characters.", {
                      severity: "warning",
                    });
                    return;
                  }
                  setName(val);
                }}
              />
              <TextField
                label="Start Date"
                type="date"
                value={start}
                // new added
                onChange={(e) => {
                  if (!e.target.value) {
                    showToast("Cannot set empty start date.", {
                      severity: "warning",
                    });
                    return;
                  }
                  setStart(e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
                inputRef={startInputRef}
                onClick={() => startInputRef.current?.showPicker?.()}
                inputProps={{
                  min: toYmd(new Date()), // this ensures only today or future dates (new added)
                }}
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
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < 0 || val > 30) {
                    showToast("Duration must be between 1 and 30 days.", {
                      severity: "warning",
                    });
                    return; // don't update
                  }
                  setDays(e.target.value);
                }}
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
                  onChange={(e) => {
                    const val = e.target.value;

                    if (val.length > 50) {
                      showToast("Goal title cannot exceed 50 characters.", {
                        severity: "warning",
                      });
                      return;
                    }

                    setDraftGoal((d) => ({ ...d, title: val }));
                  }}
                />
              </S.Grow>
              <S.FieldSm>
                <TextField
                  type="number"
                  label="Estimated Hours"
                  value={draftGoal.hours}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    const maxHours = Number(days) * 24;

                    if (val > maxHours) {
                      showToast(
                        `Max allowed for this sprint is ${maxHours}h.`,
                        { severity: "warning" }
                      );
                      return;
                    }

                    setDraftGoal((d) => ({ ...d, hours: e.target.value }));
                  }}
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
                                      {/* new added */}
                                      <IconButton
                                        size="small"
                                        onClick={() => removeGoal(g.id)}
                                        sx={{
                                          ml: "auto",
                                          color: "red",
                                        }}
                                      >
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
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
