"use client";

// Library Import
import React, { useState, useTransition } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

// Component Import
import EntriesColumn from "./EntriesColumn";
import EntriesCard from "./EntriesCard";

// Constants Import
import { columnsData } from "@/lib/constants";

// Types Import
import { Column } from "@/lib/types";
import axios from "axios";

const Dashboard = ({ data }: { data: Column[] }) => {
  const [columns, setColumns] = useState<Column[]>(data);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();

  const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const auth =
    process.env.AUTHORIZATION ||
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZGIzYjJlYy02NWZkLTQ5ZjctOWY4ZS0yOWNhOTk5YTkyNzkiLCJlbWFpbCI6ImNvbXAxQGdtYWlsLmNvbSIsImlhdCI6MTczMjc2MzcyMywiZXhwIjoxNzMyODUwMTIzfQ.EYasunW410LP2vte1PZNkdO_sLx4peyNhi2A_FRc-HM";

  const findActiveTask = (id: string) => {
    for (const column of Object.values(columns)) {
      const task = column.tasks.find((task) => task.id === id);
      if (task) return task;
    }
    return null;
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const [sourceColumnId, sourceIndex] = findTask(active.id);
    const [targetColumnId, targetIndex] = findTask(over.id);

    if (!sourceColumnId || !targetColumnId) return;
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex)
      return;

    setColumns((columns) => {
      // @ts-ignore
      const sourceTasks = [...columns[sourceColumnId].tasks];
      // @ts-ignore
      const targetTasks =
        sourceColumnId === targetColumnId
          ? sourceTasks
          : [...columns[targetColumnId].tasks];
      // @ts-ignore
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      movedTask.title = columns[targetColumnId].name;

      if (sourceColumnId === targetColumnId) {
        // @ts-ignore
        sourceTasks.splice(targetIndex, 0, movedTask);
      } else {
        // @ts-ignore
        targetTasks.splice(targetIndex, 0, movedTask);
      }

      // Backend API call to update the task
      const fromCategory = columns[sourceColumnId].name;
      const toCategory = columns[targetColumnId].name;

      console.log(
        `Moved task with id ${active.id} from ${fromCategory} to ${toCategory}`
      );

      // startTransition(() => {
      const res = axios
        .put(
          backendUrl + "/communication-entity/category/" + active.id,
          { from: fromCategory, to: toCategory },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        )
        .catch((err) => {
          console.error(err);
        });
      // });

      return {
        ...columns,
        [sourceColumnId]: {
          // @ts-ignore
          ...columns[sourceColumnId],
          tasks: sourceTasks,
        },
        [targetColumnId]: {
          // @ts-ignore
          ...columns[targetColumnId],
          tasks: targetTasks,
        },
      };
    });
  };

  const findTask = (taskId: string) => {
    for (const [columnId, column] of Object.entries(columns)) {
      const index = column.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        return [columnId, index];
      }
    }
    return [null, null];
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeTask = activeId ? findActiveTask(activeId) : null;

  return (
    <div className="hidden lg:block h-full">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-x-4 overflow-x-scroll overflow-y-hidden h-full scroll-container">
          {Object.entries(columns).map(([columnId, { name, icon, tasks }]) => (
            <EntriesColumn
              key={columnId}
              name={name}
              icon={icon}
              tasks={tasks}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <EntriesCard
              id={activeTask.id}
              title={activeTask.title}
              userName={activeTask.userName}
              contactInfo={activeTask.contactInfo}
              interactionHistory={activeTask.interactionHistory}
              status={activeTask.status}
              notes={activeTask.notes}
              social={activeTask.social}
              urgency={activeTask.urgency}
              subcategory={activeTask.subcategory}
              timestamp={activeTask.timestamp}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
