"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./theme-toggle";

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image fill alt="logo" src="/logo.png" />
                </div>
                <h1 className="text-2xl font-bold text-[#714325] dark:text-white">
                    Fabricate
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <div className="mr-1">
                    <ModeToggle />
                </div>
                <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
                    <Button variant="outline" className="transition-all delay-1500 rounded-full text-[#714325] dark:text-white outline-none bg-[#FFF9F5] hover:-translate-y-1 hover:scale-110 dark:bg-[#17264D]">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}