import { services } from "@/constant";
import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const Services = () => {
  return (
    <section className="max-w-5xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold font-serif my-5">Health Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        {services.map((service, i) => (
          <Card key={i} className="justify-between">
            <CardContent className="space-y-4">
              <service.icon size={48} className="text-green-600" />
              <h3 className="font-bold text-xl">{service.title}</h3>
              <p>{service.subtitle}</p>
            </CardContent>
            <CardFooter>
              <Link href="/chat">
                <Button className="w-full">{service.action}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
