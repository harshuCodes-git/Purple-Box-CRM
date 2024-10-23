'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/lib/types';
import { Icon } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const EntriesCard = ({ id, title, userName, contactInfo, interactionHistory, status, notes, social: SocialIcon }: Task) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const statusColor = status === 'Closed' ? 'bg-red-500' : 'bg-green-300';

  return (
    <div
      className="relative p-4 mb-2 bg-[#0E0C1A] border-2 border-primary-purple/50 rounded-lg w-full text-white font-agrandir"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="absolute top-4 right-4 bg-[#17181A] border-2 border-[#33353C] rounded-md cursor-pointer">
            <EllipsisVertical className="w-4 h-4 text-white/75" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="absolute z-20 -translate-x-[250px] -translate-y-[25px] text-black/75 bg-white shadow-lg p-2 rounded-md">
          {status && <p className="text-[13px]">Status: {status}</p>}
          {notes && <p className="text-[13px]">Notes: {notes}</p>}
        </HoverCardContent>
      </HoverCard>

      <div>
        {title && <p className="text-sm">{title}</p>}
        <div className='flex gap-x-4 items-center'>
          {userName && <p className="font-medium text-xl font-gotham">{userName}</p>}
          {SocialIcon && <SocialIcon className="w-4 h-4 inline-block ml-2" />}
        </div>
        {contactInfo && (
          <p className="text-sm">
            {contactInfo?.email} <br /> {contactInfo?.phone}
          </p>
        )}
      </div>

      {interactionHistory && interactionHistory.length > 0 && (
        <ul className="flex flex-wrap gap-2 mt-4">
          {interactionHistory.map((interaction, index) => (
            <li
              key={index}
              className="text-sm border-2 border-[#33353C]/50 bg-[#18113E] px-2 py-1 rounded-md"
            >
              {interaction}
            </li>
          ))}
        </ul>
      )}

      <div className="absolute bottom-4 right-4">
        <div className={`${statusColor} h-2 w-2 rounded-full`} />
      </div>
    </div>
  );
};

export default EntriesCard;
