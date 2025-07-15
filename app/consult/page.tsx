import Call from "@/components/ui/Call";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Consult = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  return (
    <section className="max-w-4xl mx-auto">
      <Call userId={data.user.id} />
    </section>
  );
};

export default Consult;
