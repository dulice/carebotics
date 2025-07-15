import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { avaliblity } from "@/constant";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-tr from-blue-100 to-blue-400 min-h-dvh">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center h-[70vh]">
          <div className="space-y-5">
            <h2 className="text-4xl font-bold font-serif">
              I provide fast and free service
            </h2>
            <p>
              I can help you understand health issues, refill medications,
              answer health and lifestyle questions, and much more. I give you
              expert medical insights at your fingertips, whenever you need
              them.
            </p>
            <Link href={"/consult"}>
              <Button>
                <Video /> Start Consultiong
              </Button>
            </Link>
          </div>
          <div>
            <Image
              src="/images/hero.png"
              alt="ai-doctor"
              width={300}
              height={300}
              className="h-[70vh] w-full object-contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {avaliblity.map((el) => (
            <Card key={el.title}>
              <CardContent>
                <p className="text-center text-3xl font-bold text-blue-600">
                  {el.title}
                </p>
                <p className="text-center">{el.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
