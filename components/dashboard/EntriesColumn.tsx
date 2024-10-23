import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import EntriesCard from './EntriesCard';
import { Column } from '@/lib/types';

const EntriesColumn = ({ tasks, name, icon: ColumnIcon }: Column) => {
  return (
    <div className="bg-[#0B0B0F] backdrop-blur-sm rounded-xl p-4 shadow-sm relative h-[525px] w-full overflow-hidden text-white">
      <h5 className="font-medium text-start w-full pb-4 flex items-center">
        {/* Render Column Icon as a React component */}
        {ColumnIcon && <ColumnIcon className="w-6 h-6 mr-2" />} 
        {name}
      </h5>
      <div className="overflow-y-auto scrollbar-hide flex items-center justify-start flex-col h-full no-scrollbar">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="placeholder p-4 text-gray-500">No tasks</div>
          ) : (
            tasks.map((task) => (
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
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default EntriesColumn;
