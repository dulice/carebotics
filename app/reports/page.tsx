import Error from "@/components/Error";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Plus, Video } from "lucide-react";
import React from "react";

const Report = async () => {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data, error }: PostgrestResponse<TReport> = await supabase
    .from("feedback")
    .select("*")
    .eq("userId", userData.user?.id);

  if (error) <Error message={error.message} />;
  return (
    <section className="container mx-auto p-5">
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((item) => (
            <ReportCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 rounded-2xl bg-yellow-50 py-5">
          <p className="font-semibold text-yellow-600 text-center">
            No report Yet
          </p>
          <Plus className="text-yellow-600" />
          <Button>
            <Video /> Start Consulting
          </Button>
        </div>
      )}
    </section>
  );
};

export default Report;
