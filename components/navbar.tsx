
import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { ModeToggle } from "./theme-toggle";

const Navbar = () => {
    return (
        <div className="flex items-center p-4 bg-[#FFF9F5] dark:bg-[#17264D]">
            <MobileSidebar />
            
            <div className="flex w-full justify-end">
                <div className="mt-0 mr-4">
                    <ModeToggle />
                </div>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
}

export default Navbar;