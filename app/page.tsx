import "@/styles/globals.css";
import { Header } from "@/components/layout/PageHeader";
import { Footer } from "@/components/layout/PageFooter";
import { getUserSession } from "@/lib/lucia";
import { redirect } from "next/navigation";
import { signOut } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { user } = await getUserSession();

  if (!user) {
    return redirect("/auth/signin");
  }

  return (
    <>
      <div className="w-full container p-4 mx-auto relative">
        <Header />        
        <Footer />
      </div>
    </>
  );
}
