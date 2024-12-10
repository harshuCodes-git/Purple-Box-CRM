// Dashboard.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { getSupabaseFrontendClient } from "@/lib/supabase/client";
import EntriesColumn from "./EntriesColumn";
import EntriesCard from "./EntriesCard";
import { Column, Task } from "@/lib/types";

const Dashboard = () => {
  const supabase = getSupabaseFrontendClient();

  // Helper function to get column icon (if needed)
  const getColumnIcon = (columnId: string): string | null => {
    switch (columnId) {
      case "column-support":
        return "Users";
      case "column-acquisition":
        return "Handshake";
      case "column-other":
        return "Box";
      default:
        return "Unknown";
    }
  };

  // Initialize columns with all three columns
  const initialColumns: { [key: string]: Column } = {
    "column-support": {
      id: "column-support",
      name: "Customer Support",
      icon: getColumnIcon("column-support")!,
      tasks: [],
    },
    "column-acquisition": {
      id: "column-acquisition",
      name: "Customer Acquisition",
      icon: getColumnIcon("column-acquisition")!,
      tasks: [],
    },
    "column-other": {
      id: "column-other",
      name: "Other",
      icon: getColumnIcon("column-other")!,
      tasks: [],
    },
  };

  const [columns, setColumns] = useState<{ [key: string]: Column }>(
    initialColumns
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch initial data
  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
        .from("customer_detail")
        .select("*, customer_channel(*, customer(*))")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching cards:", error);
        return;
      }

      // Start with initialColumns to ensure all columns are present
      const updatedColumns = { ...initialColumns };

      data?.forEach((card: any) => {
        const columnId = determineColumnId(card.category);

        // Ensure the column exists
        if (!updatedColumns[columnId]) {
          updatedColumns[columnId] = {
            id: columnId,
            name: getColumnName(columnId),
            icon: getColumnIcon(columnId)!,
            tasks: [],
          };
        }

        updatedColumns[columnId].tasks.push(transformCardToTask(card));
      });

      setColumns(updatedColumns);
    };

    fetchCards();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("new_customer_detail")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "customer_detail",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              handleInsert(payload.new);
              break;
            case "UPDATE":
              handleUpdate(payload.old, payload.new);
              break;
            case "DELETE":
              handleDelete(payload.old);
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle INSERT
  const handleInsert = (newCard: any) => {
    const columnId = determineColumnId(newCard.category);
    const task = transformCardToTask(newCard);

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      // Columns already initialized, no need to check if they exist
      updatedColumns[columnId].tasks = [
        ...updatedColumns[columnId].tasks,
        task,
      ];

      return updatedColumns;
    });
  };

  // Handle UPDATE
  const handleUpdate = (oldCard: any, newCard: any) => {
    const oldColumnId = determineColumnId(oldCard.category);
    const newColumnId = determineColumnId(newCard.category);
    const updatedTask = transformCardToTask(newCard);

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      // Remove from old column
      updatedColumns[oldColumnId].tasks = updatedColumns[
        oldColumnId
      ].tasks.filter((task) => task.id !== oldCard.id);

      // Add to new column
      updatedColumns[newColumnId].tasks = [
        updatedTask,
        ...updatedColumns[newColumnId].tasks,
      ];

      return updatedColumns;
    });
  };

  // Handle DELETE
  const handleDelete = (deletedCard: any) => {
    const columnId = determineColumnId(deletedCard.category);

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      updatedColumns[columnId].tasks = updatedColumns[columnId].tasks.filter(
        (task) => task.id !== deletedCard.id
      );

      return updatedColumns;
    });
  };

  // Helper functions
  const determineColumnId = (category: string): string => {
    switch (category) {
      case "customer_support":
        return "column-support";
      case "customer_acquisition":
        return "column-acquisition";
      case "other":
      default:
        return "column-other";
    }
  };

  const getColumnName = (columnId: string): string => {
    switch (columnId) {
      case "column-support":
        return "Customer Support";
      case "column-acquisition":
        return "Customer Acquisition";
      case "column-other":
        return "Other";
      default:
        return "Unknown";
    }
  };

  const transformCardToTask = (card: any): Task => ({
    id: card.id,
    title: card.message,
    userName: card.customer_channel.customer.name,
    contactInfo: card.customer_channel.customer,
    interactionHistory: card.customer_channel.conversation,
    status: card.status,
    notes: card.note,
    social: card.customer_channel.platform,
    urgency: card.urgency,
    subcategory: card.sub_category,
    category: card.category,
    timestamp: new Date().toString(),
  });

  // Drag and Drop Handlers
  const findTask = (taskId: string) => {
    for (const [columnId, column] of Object.entries(columns)) {
      const index = column.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        return [columnId, index];
      }
    }
    return [null, null];
  };

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

    const activeElement = document.querySelector(`[data-id="${active.id}"]`);
    if (activeElement) {
      activeElement.classList.add("opacity-30");
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const activeElement = document.querySelector(`[data-id="${active.id}"]`);
    if (activeElement) {
      activeElement.classList.remove("opacity-30");
    }
    setActiveId(null);

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id as string;

    const [sourceColumnId, sourceIndex] = findTask(activeId);
    if (!sourceColumnId) return;

    let targetColumnId: string;
    let targetIndex: number;

    if (overId in columns) {
      // Dropped over a column (possibly empty)
      targetColumnId = overId.toString();
      targetIndex = columns[targetColumnId].tasks.length;
    } else {
      // Dropped over a task
      const result = findTask(overId);
      if (!result[0]) return;
      [targetColumnId, targetIndex] = result as [string, number];
    }

    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex)
      return;

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      const sourceTasks = [...updatedColumns[sourceColumnId].tasks];
      const [movedTask] = sourceTasks.splice(sourceIndex as number, 1);

      if (sourceColumnId === targetColumnId) {
        sourceTasks.splice(targetIndex as number, 0, movedTask);
        updatedColumns[sourceColumnId].tasks = sourceTasks;
      } else {
        const targetTasks = [...updatedColumns[targetColumnId].tasks];
        targetTasks.splice(targetIndex as number, 0, movedTask);

        updatedColumns[sourceColumnId].tasks = sourceTasks;
        updatedColumns[targetColumnId].tasks = targetTasks;

        const newCategory = mapColumnIdToCategory(targetColumnId);

        supabase
          .from("customer_detail")
          .update({ category: newCategory })
          .eq("id", movedTask.id)
          .then(({ error }) => {
            if (error) {
              console.error("Error updating task category:", error);
            } else {
              movedTask.category = newCategory;
            }
          });
      }

      return updatedColumns;
    });
  };

  const mapColumnIdToCategory = (columnId: string): string => {
    switch (columnId) {
      case "column-support":
        return "customer_support";
      case "column-acquisition":
        return "customer_acquisition";
      case "column-other":
        return "other";
      default:
        return "other";
    }
  };

  return (
    <div className="h-full w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-x-4 p-4 min-w-max">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-[350px] md:w-full">
              {" "}
              {/* Fixed width for each column */}
              <EntriesColumn
                key={columnId}
                id={columnId}
                name={column.name}
                icon={column.icon}
                tasks={column.tasks}
              />
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <EntriesCard {...(findActiveTask(activeId) as Task)} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
