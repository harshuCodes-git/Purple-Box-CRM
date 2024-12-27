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

const Dashboard = ({ id }: { id: string }) => {
  const supabase = getSupabaseFrontendClient();

  console.log(id);

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
        .select(
          `
        *,
        customer_channel!inner (
          *,
          customer!inner (*)
        )
      `
        )
        .eq("customer_channel.customer.client_id", id)
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
      .channel(`new-channel-${id}`)
      .on(
        "broadcast",
        {
          event: "new-detail",
        },
        (payload) => {
          console.log(payload);
          switch (payload.payload.eventType) {
            case "CREATE":
              handleInsert(payload.payload.new);
              break;
            case "UPDATE":
              handleUpdate(payload.payload.old, payload.payload.new);
              break;
            case "DELETE":
              handleDelete(payload.payload.old);
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleInsert = (newCard: any) => {
    console.log("inserting");
    const columnId = determineColumnId(newCard.category);
    const task = transformCardToTask(newCard);

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };

      updatedColumns[columnId].tasks = [
        ...updatedColumns[columnId].tasks,
        task,
      ];

      return updatedColumns;
    });

    console.log("inserted");
  };

  const handleUpdate = (oldCard: any, newCard: any) => {
    console.log("Updating card:", { old: oldCard, new: newCard });
    const newColumnId = determineColumnId(newCard.category);
    const updatedTask = transformCardToTask(newCard);

    setColumns((prevColumns) => {
      const withoutOldCard = Object.fromEntries(
        Object.entries(prevColumns).map(([columnId, column]) => {
          return [
            columnId,
            {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== oldCard.id),
            },
          ];
        })
      );

      // Then add updated card to correct column
      withoutOldCard[newColumnId].tasks = [
        updatedTask,
        ...withoutOldCard[newColumnId].tasks,
      ];

      console.log("Updated columns after update:", withoutOldCard);
      return withoutOldCard;
    });
  };

  // Handle DELETE
  const handleDelete = async (deletedCard: any) => {
    try {
      const cardId = deletedCard.id;
      console.log("Deleting card:", cardId);

      if (!cardId) {
        console.error("No card ID found for deletion");
        return;
      }

      setColumns((prevColumns) => {
        // Map through all columns and remove card with matching ID
        const cleanedColumns = Object.fromEntries(
          Object.entries(prevColumns).map(([columnId, column]) => [
            columnId,
            {
              ...column,
              // Filter out the deleted card
              tasks: column.tasks.filter((task) => {
                if (task.id === cardId) {
                  console.log(`Removing task ${cardId} from ${columnId}`);
                  return false;
                }
                return true;
              }),
            },
          ])
        );

        console.log("Columns after deletion:", cleanedColumns);
        return cleanedColumns;
      });
    } catch (error) {
      console.error("Error removing card from columns:", error);
    }
  };

  // Helper functions
  const determineColumnId = (category: string): string => {
    switch (category) {
      case "customer_support":
        return "column-support";
      case "Customer Support":
        return "column-support";
      case "customer_acquisition":
        return "column-acquisition";
      case "Customer Acquisition":
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

  const getConversationLink = (card: any) => {
    switch (card.customer_channel.platform) {
      case "whatsapp":
        return `https://wa.me/${card.customer_channel.credential_id}`;
      case "instagram":
        return `https://instagram.com/${card.customer_channel.credential_id}`;
      default:
        return "";
    }
  };

  const transformCardToTask = (card: any): Task => ({
    id: card.id,
    title: card.message,
    userName:
      card.customer_channel.customer.name ??
      card.customer_channel.credential_id,
    contactInfo: card.customer_channel.customer,
    interactionHistory: card.customer_channel.conversation,
    status: card.status,
    notes: card.note,
    social: card.customer_channel.platform,
    urgency: card.urgency,
    subcategory: card.sub_category,
    category: card.category,
    timestamp: new Date().toString(),
    conversationLink: getConversationLink(card),
    resolved: card.resolved,
    language: card.language,
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
            <EntriesCard
              {...(findActiveTask(activeId) as Task)}
              key={findActiveTask(activeId)?.id}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
