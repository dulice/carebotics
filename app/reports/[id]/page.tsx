import GoBack from "@/components/GoBack";
import ReportSection from "@/components/ReportSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import moment from "moment";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error }: PostgrestResponse<TReport> = await supabase
    .from("feedback")
    .select("*")
    .eq("id", id);

  if (error) return <p>{error.message}</p>;
  return (
    <section className="max-w-3xl mx-auto p-4 md:p-10">
      <GoBack />
      {data ? (
        <Card>
          <CardHeader>
            <h2 className="font-serif text-xl font-bold text-center">
              Your Medical Consult Report
            </h2>
          </CardHeader>
          <CardContent className="space-y-10">
            <p className="text-end text-sm text-gray-700">
              {moment(data[0].created_at).format("MMM DD, YYYY")}
            </p>
            <ReportSection
              title="Chief Complaint"
              subtitle={data[0].complaint}
            />
            <ReportSection title="Symptom" details={data[0].symptom} />
            <ReportSection
              title="Duration & Severity"
              subtitle={`Duration: ${data[0].duration}`}
              subtitle1={`Severity: ${data[0].severity}`}
            />
            <div>
              <h3 className="text-xl font-bold text-blue-600">
                Treatment Mention
              </h3>

              <ul>
                {data[0].medicine.map((detail, i) => (
                  <li key={i}>
                    <h4 className="font-bold mt-2">{detail.name}</h4>
                    <p>{detail.dose}</p>
                  </li>
                ))}
              </ul>
            </div>
            <ReportSection
              title="Recommendation"
              details={data[0].recommendation}
            />
          </CardContent>
        </Card>
      ) : (
        <p className="bg-red-200 rounded-md p-2">No Report found</p>
      )}
    </section>
  );
};

export default page;
