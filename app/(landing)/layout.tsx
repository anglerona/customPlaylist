const LandingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <main className="h-full bg-[#FFF9F5] overflow-auto dark:bg-[#17264D]">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    );
}

export default LandingLayout;