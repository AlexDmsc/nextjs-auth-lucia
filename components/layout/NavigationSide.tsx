"use client";
import { Button } from "@/components/ui/button"


export function NavigationSide () {
  return (
		<div className="ml-7 border w-40">
			<ul className="flex flex-col w-full">
				<li>
					<span className="px-4 text-lg font-bold">Discover</span>
				</li>
				<li>
          <Button className="ml-2 text-md font-semibold" variant="ghost">Listen now </Button>
				</li>
				<li>
        <Button className="ml-2 text-md font-semibold" variant="ghost">Manager</Button>
				</li>
				<li>
					<span className="mb-2 px-4 text-lg font-bold">Account</span>
				</li>
				<li>
        <Button className="ml-2 text-md font-semibold" variant="ghost">Playlists</Button>
				</li>
				<li>
        <Button className="ml-2 text-md font-semibold" variant="ghost">Songs</Button>
				</li>
			</ul>
		</div>
  );
};
