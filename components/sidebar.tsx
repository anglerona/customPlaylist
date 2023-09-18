"use client";

import Link from "next/link";
import Image from "next/image";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-green-700",
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#FFF9F5] text-[#714325] rounded-lg shadow-lg shadow-[#E5C0A8] dark:shadow-[#113FAE] dark:bg-[#17264D] dark:text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="logo" src="/logo.png" />
                    </div>
                    <h1 className="text-2xl font-bold">
                        Manifesto
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link 
                            href={route.href} 
                            key={route.href} 
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-[#714325] hover:bg-[#F8E8E0] dark:hover:bg-[#113FAE] rounded-lg transition", 
                                        pathname === route.href ? "text-[#714325] bg-[#F8E8E0] dark:text-white dark:bg-[#113FAE]" : "text-[#AF9B91] dark:text-[#BBC3DA]")}
                        >   
                            <div className="flex items-center flex-1">  
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;