"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
]

const DashboardPage = () =>  {
  const router = useRouter();
  return (
    <div className="bg-[#FFF9F5] dark:bg-[#17264D]">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#714325] dark:text-white">
          Create some cool stuff eyy
        </h2>
        <p className="text-[#AF9B91] font-light text-sm md:text-lg text-center dark:text-[#BBC3DA]">
          Use the help of AI to make life a little easier
        </p>
      </div>
      <div className="px-4 pb-8 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card onClick={() => router.push(tool.href)} key={tool.href} className="p-4 transition-all bg-[#FFF9F5] border-none shadow-md shadow-[#E5C0A8] dark:shadow-[#113FAE] flex items-center justify-between hover:shadow-md hover:shadow-[#E5C0A8] dark:hover:shadow-[#113FAE] cursor-pointer hover:-translate-y-1 hover:scale-105
          dark:bg-[#17264D]">
            <div className="flex items-center gap-x-4 text-[#714325] dark:text-white">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-[#714325] dark:text-white" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;