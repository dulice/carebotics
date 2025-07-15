import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const About = () => {
  return (
    <section>
      <div className="max-w-2xl mx-auto space-y-10 my-32 px-4">
        <h3 className="text-4xl text-center">
          You can talk to me just like you would your regular doctor
        </h3>
        <p className="text-center">
          I can help you understand health issues, refill medications, answer
          health and lifestyle questions, and much more. I give you expert
          medical insights at your fingertips, whenever you need them.
        </p>
        <div className="w-full md:w-1/2 mx-auto">
          <Image
            src={"/images/chat.png"}
            alt="chat"
            width={300}
            height={300}
            className="w-full"
          />
        </div>
        <div className="flex justify-end w-full">
          <Link href={"/chat"}>
            <Button>Start Chatting</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
