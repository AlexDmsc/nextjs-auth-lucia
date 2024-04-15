import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserSession } from "@/lib/lucia";
import { signOut } from "@/actions/auth.actions";
import { Button } from "../ui/button";
import Link from "next/link";
import { getUser } from "@/actions/user.actions";

export async function Profile() {

  const { user } = await getUserSession();
  const userData = await getUser(user.id);

  return (
    <div className="relative ml-auto flex-1 md:grow-0 ml-4">
      <DropdownMenu>
        <DropdownMenuTrigger>{userData.firstName}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>New Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={signOut}>
              <Button variant="link" type="submit">
                <span>Sign out</span>
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
