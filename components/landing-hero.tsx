"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
        <div className="text-[#714325] dark:text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    Your little AI helper for generating
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#18E5E2] to-[#28CBFF]">
                    <TypewriterComponent options={{
                        strings: [
                            "Conversations",
                            "Images",
                            "Music",
                            "Videos",
                            "Code Snippets",
                        ],
                        autoStart: true,
                        loop: true,
                    }} />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-[#AF9B91] dark:text-[#BBC3DA]">
                Manifest something into existence with text.
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button className="transition-all delay-1500 text-white md:text-lg p-4 md:p-6 rounded-full font-semibold bg-gradient-to-r from-[#D15A95] to-[#F59F54] hover:from-[#18E5E2] hover:to-[#D15A95] hover:-translate-y-1 hover:scale-110">
                        Start Creating
                    </Button>
                </Link>
            </div>
        </div>
    )
}