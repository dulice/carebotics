import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function ReportLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return <>{children}</>;
}
