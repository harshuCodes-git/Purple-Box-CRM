'use client'

import { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EntriesCard from './EntriesCard';
import { Column } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const EntriesColumn = ({ tasks, name, icon: ColumnIcon }: Column) => {
  const [filter, setFilter] = useState({ type: '', value: '' });
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    console.log("Filter:", filter)

    const applyFilter = () => {
      if (filter.type === 'Status') {
        setFilteredTasks(tasks.filter(task => task.status === filter.value));
      } else if (filter.type === 'Urgency') {
        setFilteredTasks(tasks.filter(task => task.urgency === filter.value));
      } else if (filter.type === 'Interaction') {
        setFilteredTasks(tasks.filter(task => task.interactionHistory?.includes(filter.value)));
      } else {
        setFilteredTasks(tasks);
      }

      console.log(filteredTasks)
    };
    applyFilter();
  }, [filter, tasks]);

  return (
    <div className="bg-[#0B0B0F] backdrop-blur-sm rounded-xl p-4 shadow-sm relative h-[525px] w-full overflow-hidden text-white">
      <h5 className="font-medium text-start w-full pb-4 flex items-center justify-between text-sm">
        <div className='flex items-center gap-x-2'>
          {ColumnIcon && <ColumnIcon className="w-4 h-4 mr-2" />} 
          {name}
        </div>
        <Select onValueChange={(value) => {
          const [type, val] = value.split(':');
          setFilter({ type, value: val });
        }}>
          <SelectTrigger className='max-w-[100px]'>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filter by Status</SelectLabel>
              <SelectItem value="Status:Open">Open</SelectItem>
              <SelectItem value="Status:Closed">Closed</SelectItem>
              <SelectItem value="Status:Active">Active</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Filter by Urgency</SelectLabel>
              <SelectItem value="Urgency:High">High</SelectItem>
              <SelectItem value="Urgency:Mid">Mid</SelectItem>
              <SelectItem value="Urgency:Low">Low</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Filter by Interaction</SelectLabel>
              <SelectItem value="Interaction:Initial Contact">Initial Contact</SelectItem>
              <SelectItem value="Interaction:Follow-up">Follow-up</SelectItem>
              <SelectItem value="Interaction:Demo Session">Demo Session</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </h5>
      <div className="overflow-y-auto scrollbar-hide flex items-center justify-start flex-col h-full no-scrollbar">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {filteredTasks.length === 0 ? (
            <div className="placeholder p-4 text-gray-500">No tasks</div>
          ) : (
            <div className='w-full pb-20'>
              {
                filteredTasks.map((task) => (
                  <EntriesCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    userName={task.userName}
                    contactInfo={task.contactInfo}
                    interactionHistory={task.interactionHistory}
                    status={task.status}
                    notes={task.notes}
                    social={task.social} 
                    urgency={task.urgency}
                  />
                ))
              }
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default EntriesColumn;
