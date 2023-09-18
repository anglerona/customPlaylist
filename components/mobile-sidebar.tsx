"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden">
                <Menu className="text-[#714325] dark:text-white" />
            </SheetTrigger>
            
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
       
    );
}

export default MobileSidebar;