"use client";

// Library Import
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Types Import
import { Task } from "@/lib/types";

// Icons Import
import {
  CheckCircle,
  SendHorizontal,
  TriangleAlert,
  CircleAlert,
} from "lucide-react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaFacebookMessenger,
  FaInstagram,
} from "react-icons/fa";

import { Button } from "../ui/button";

// Types Import
import { SocialPlatform } from "@/lib/types";
import Link from "next/link";

const EntriesCard = ({
  id,
  title,
  userName,
  contactInfo,
  conversationLink,
  status,
  notes,
  social: SocialIcon,
  urgency,
  subcategory,
  timestamp,
  resolved,
  language,
}: Task) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const statusColor = status === "Closed" ? "bg-red-500" : "bg-green-300";

  return (
    <div
      className="relative p-4 mb-2 bg-[#0E0C1A] border-2 border-primary-purple/50 rounded-lg w-full text-white font-agrandir"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      data-id={id}
    >
      <div
        className={`absolute top-4 right-4 rounded-md border-2 px-2 py-1 text-white/75 ${
          status === "Open"
            ? "bg-green-500/10 border-green-200"
            : status === "Closed"
            ? "bg-red-500/10 border-red-200"
            : status === "Active"
            ? "bg-blue-500/10 border-blue-200"
            : "bg-gray-500 border-gray-500"
        }`}
      >
        <p className="text-[13px]">{status}</p>
      </div>
      {/* Card Header */}
      <div className="flex flex-col gap-y-[4px]">
        <p className="text-sm text-gray-400">{title}</p>
        <div className="flex items-center">
          <p className="font-medium text-xl text-white font-gotham">
            {userName}
          </p>
          {SocialIcon === SocialPlatform.WhatsApp && (
            <FaWhatsapp
              className="w-5 h-5 inline-block ml-2"
              style={{ color: "#25D366" }}
            />
          )}
          {SocialIcon === SocialPlatform.Email && (
            <FaEnvelope
              className="w-5 h-5 inline-block ml-2"
              style={{ color: "#4A90E2" }}
            />
          )}
          {SocialIcon === SocialPlatform.FacebookMessenger && (
            <FaFacebookMessenger
              className="w-5 h-5 inline-block ml-2"
              style={{ color: "#0084FF" }}
            />
          )}
          {SocialIcon === SocialPlatform.Instagram && (
            <FaInstagram
              className="w-5 h-5 inline-block ml-2"
              style={{ color: "#E1306C" }}
            />
          )}
        </div>
        <p className="text-sm text-gray-300">
          {contactInfo.email} <br /> {contactInfo.phone}
        </p>
      </div>
      Interaction History
      {/* {interactionHistory.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {interactionHistory.slice(0, 3).map((interaction, index) => (
            <span
              key={index}
              className="text-xs border-2 border-white/10 bg-[#18113E] px-2 py-1 rounded-md"
            >
              {interaction}
            </span>
          ))}
          {interactionHistory.length > 3 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="text-xs border-2 border-white/10 bg-[#18113E] px-2 py-1 rounded-md cursor-pointer">
                  +{interactionHistory.length - 3} more
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="z-20 text-black/75 bg-white shadow-lg p-2 rounded-md max-w-xs">
                <ul className="text-xs text-gray-700">
                  {interactionHistory.slice(3).map((interaction, index) => (
                    <li key={index}>{interaction}</li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      )} */}
      {/* Status */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center gap-x-4">
        <p className="text-xs text-white/80">{subcategory}</p>
        <div
          className={`${
            resolved ? "bg-green-500" : "bg-red-500"
          } h-2 w-2 rounded-full`}
        />
      </div>
      {/* Urgency */}
      <div className="flex flex-col gap-y-2 items-start justify-center gap-x-2 mt-4">
        <Link target="_blank" href={conversationLink}>
          <Button
            className="text-xs font-gotham rounded-full bg-transparent flex items-center gap-x-2 hover:gap-x-4 transition-all border-white text-white hover:bg-purple-100/10 hover:text-white font-light"
            variant={"outline"}
            size={"sm"}
          >
            Go To Conversation <SendHorizontal />
          </Button>
        </Link>
        <div className="flex justify-center">
          {urgency === "High" && (
            <div className="text-red-500 border-2 border-red-500 rounded-full text-sm flex items-center gap-x-2 px-3 py-1">
              High Urgency <TriangleAlert className="h-4 w-4" />
            </div>
          )}
          {urgency === "Mid" && (
            <div className="text-yellow-500 border-2 border-yellow-500 rounded-full text-sm flex items-center gap-x-2 px-3 py-1">
              Mid Urgency <CircleAlert className="h-4 w-4" />
            </div>
          )}
          {urgency === "Low" && (
            <div className="text-green-500 border-2 border-green-500 rounded-full text-sm flex items-center gap-x-2 px-3 py-1">
              Low Urgency <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      {/* Notes */}
      <div className="text-white mt-4">
        <p className="text-[13px]">
          Notes: <br /> {notes}
        </p>
      </div>
      {/* Timestamp and Language */}
      <div className="flex items-center gap-2 mt-4">
        <p className="text-xs text-white/75 ">
          {new Date(timestamp).toLocaleDateString()}
        </p>
        -<p className="text-xs text-white/75">{language}</p>
      </div>
    </div>
  );
};

export default EntriesCard;
