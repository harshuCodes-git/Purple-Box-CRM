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
import { Phone } from 'lucide-react';
import { Mails } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { columnsData } from '@/lib/constants';

const Dashboard = () => {
  const [columns, setColumns] = useState<Record<string, Column>>(columnsData);   

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
    <div className='h-full'>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        {/* Display Column */}
        <div className='flex gap-x-4 overflow-x-scroll overflow-y-hidden h-full scroll-container'>
          {Object.entries(columns).map(([columnId, { name, icon, tasks }]) => (
            <EntriesColumn key={columnId} name={name} icon={icon} tasks={tasks} />
          ))}
        </div>
        {/* On Drag Display Card */}
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
          ) : 
            null
          }
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;