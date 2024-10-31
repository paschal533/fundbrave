import ChatIcon from "@/icons/chat-icon";
import HelpDeskIcon from "@/icons/help-desk-icon";
import {
  ArrowRightLeft,
  Droplets,
  Blocks,
  Boxes,
  PlaneTakeoff,
  Settings,
  Send,
} from "lucide-react";

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Donation Records",
    icon: <ArrowRightLeft className="h-7 w-7 mr-2 text-sky-500" />,
    path: "dashboard/donations",
  },
  {
    label: "POAPs Received",
    icon: <Droplets className="h-7 w-7 mr-2 text-orange" />,
    path: "dashboard/poaps",
  },
  {
    label: "Active campaigns",
    icon: <Boxes className="h-7 w-7 mr-2 text-pink-700" />,
    path: "dashboard/campaigns",
  }
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Answers", "Domain"];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "chat",
    icon: <ChatIcon />,
  },
  {
    label: "helpdesk",
    icon: <HelpDeskIcon />,
  },
];
