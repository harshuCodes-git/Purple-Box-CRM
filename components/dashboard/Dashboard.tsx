'use client'

import React, { useState } from 'react';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import EntriesColumn from './EntriesColumn';
import EntriesCard from './EntriesCard';
import { Column } from '@/lib/types';
import { Users } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { Box } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Mails } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const [columns, setColumns] = useState<Record<string, Column>>({
    column1: {
      name: "Customer Support",
      icon: Users,
      tasks: [
        { id: '11', title: "Placeholder (Do not move)" },
        {
          id: '1',
          userName: "John Doe",
          social: MessageCircle,  
          contactInfo: { email: "john.doe@example.com", phone: "123-456-7890" },
          interactionHistory: ["Initial contact", "Follow-up call"],
          status: "Closed",
          notes: "Not happy in product X",
        },
      ],
    },
    column2: {
      name: "Customer Acquisition",
      icon: Handshake,
      tasks: [
        { id: '20', title: "Placeholder (Do not move)" },
        {
          id: '2',
          userName: "Jane Smith",
          social: Mails,
          contactInfo: { email: "jane.smith@example.com", phone: "987-654-3210" },
          interactionHistory: ["Exploratory meeting"],
          status: "Closed",
          notes: "Prefers competitor's product",
        },
      ],
    },
    column3: {
      name: "Other",
      icon: Box,
      tasks: [
        { id: '30', title: "Placeholder (Do not move)" },
        {
          id: '3',
          userName: "Michael Johnson",
          social: MessageCircle,
          contactInfo: { email: "michael.johnson@example.com", phone: "555-123-4567" },
          interactionHistory: ["Demo session", "Positive feedback"],
          status: "Active",
          notes: "Scheduled follow-up",
        },
      ],
    },
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const findActiveTask = (id: string) => {
    for (const column of Object.values(columns)) {
      const task = column.tasks.find(task => task.id === id);
      if (task) return task;
    }
    return null;
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event:any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const [sourceColumnId, sourceIndex] = findTask(active.id);
    const [targetColumnId, targetIndex] = findTask(over.id);

    if (!sourceColumnId || !targetColumnId) return;
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex) return;

    setColumns(columns => {
      const sourceTasks = [...columns[sourceColumnId].tasks];
      const targetTasks = sourceColumnId === targetColumnId ? sourceTasks : [...columns[targetColumnId].tasks];
      // @ts-ignore
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);

      if (sourceColumnId === targetColumnId) {
        // @ts-ignore
        sourceTasks.splice(targetIndex, 0, movedTask);
      } else {
        // @ts-ignore
        targetTasks.splice(targetIndex, 0, movedTask);
      }

      return {
        ...columns,
        [sourceColumnId]: { ...columns[sourceColumnId], tasks: sourceTasks },
        [targetColumnId]: { ...columns[targetColumnId], tasks: targetTasks }
      };
    });
  };

  const findTask = (taskId: string) => {
    for (const [columnId, column] of Object.entries(columns)) {
      const index = column.tasks.findIndex(task => task.id === taskId);
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
    <div>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className='flex gap-x-4 overflow-x-scroll overflow-y-hidden min-h-[550px] scroll-container'>
          {Object.entries(columns).map(([columnId, { name, icon, tasks }]) => (
            <EntriesColumn key={columnId} name={name} icon={icon} tasks={tasks} />
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
            />
          ) : 
            null
          }
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;