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
                notes: "Not happy with product X",
                urgency: "High"
            },
            {
                id: '12',
                userName: "Alice Brown",
                social: Phone,
                contactInfo: { email: "alice.brown@example.com", phone: "234-567-8901" },
                interactionHistory: ["Complaint received"],
                status: "Open",
                notes: "Issue with product delivery",
                urgency: "High"
            },
            {
                id: '13',
                userName: "Charlie Green",
                social: MessageCircle,
                contactInfo: { email: "charlie.green@example.com", phone: "345-678-9012" },
                interactionHistory: ["Billing question"],
                status: "Closed",
                notes: "Resolved billing issue",
                urgency: "Low"
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
                urgency: "Low"
            },
            {
                id: '21',
                userName: "Liam Davis",
                social: Phone,
                contactInfo: { email: "liam.davis@example.com", phone: "456-789-0123" },
                interactionHistory: ["Introductory call", "Follow-up email"],
                status: "Active",
                notes: "Interested in demo",
                urgency: "Medium"
            },
            {
                id: '22',
                userName: "Emily White",
                social: MessageCircle,
                contactInfo: { email: "emily.white@example.com", phone: "567-890-1234" },
                interactionHistory: ["Initial interest form"],
                status: "Open",
                notes: "Awaiting product details",
                urgency: "High"
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
                urgency: "Mid"
            },
            {
                id: '31',
                userName: "Sarah Lee",
                social: Phone,
                contactInfo: { email: "sarah.lee@example.com", phone: "678-901-2345" },
                interactionHistory: ["Inquiry about warranty"],
                status: "Closed",
                notes: "Warranty information provided",
                urgency: "Low"
            },
            {
                id: '32',
                userName: "David Miller",
                social: Mails,
                contactInfo: { email: "david.miller@example.com", phone: "789-012-3456" },
                interactionHistory: ["General feedback"],
                status: "Open",
                notes: "Likes product, suggested improvements",
                urgency: "Low"
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
              social={activeTask.social}
              urgency={activeTask.urgency}
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