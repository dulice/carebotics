import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const Logout = () => {
  const handleLogout = async () => {
    "use server";
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    }
    redirect("/login");
  };
  return (
    <form action={handleLogout}>
      <Button>Logout</Button>
    </form>
  );
};

export default Logout;
