import Image from "next/image";

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image alt="logo" fill src="/logo.png" />
            </div>
            <p className="text-sm text-[#AF9B91] dark:text-[#BBC3DA]">
                Manifesto is cooking something up...
            </p>
            <p className="text-sm text-[#AF9B91] dark:text-[#BBC3DA]">
                (This can take up to a few minutes)
            </p>
        </div>
    );
};