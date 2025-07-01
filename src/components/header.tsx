import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger /> {/* Button to toggle the sidebar [^4] */}
      <h1 className="text-lg font-semibold md:text-xl">My Application</h1>
      <div className="ml-auto">
        {/* Add any other header elements here, e.g., user avatar, notifications */}
      </div>
    </header>
  );
}
