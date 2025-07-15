import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import moment from "moment";
import { Dna, HeartPulse, Pill, Syringe } from "lucide-react";
import Link from "next/link";

const ReportCard = ({ item }: { item: TReport }) => {
  const icons = [HeartPulse, Pill, Syringe, Dna];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <Card className="justify-between">
      <CardContent>
        <RandomIcon
          name="pill"
          size={48}
          className="bg-green-500 text-white rounded-full p-2"
        />
        <h5 className="font-bold text-lg line-clamp-2">{item.complaint}</h5>
        <p className="text-sm text-gray-700">
          {moment(item.created_at).format("MMM DD, YYYY")}
        </p>
        <p className="line-clamp-4">Symptom: {item.symptom.join(", ")}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/reports/${item.id}`}>
          <Button>View Report</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
