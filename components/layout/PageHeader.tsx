import { TopNavigationMenu } from "@/components/layout/NavigationMenu";
import { ModeToggle } from "@/components/layout/ModeToggle";
import SearchBar from "@/components/layout/SearchBar";
import { Profile } from "@/components/layout/Profile";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <TopNavigationMenu />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <div className="mr-6">
              <SearchBar />
            </div>
            <ModeToggle />
            <Profile />
          </nav>
        </div>
      </div>
    </header>
  );
}
