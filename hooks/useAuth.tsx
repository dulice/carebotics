import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const useAuth = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }
  return data.user;
};
