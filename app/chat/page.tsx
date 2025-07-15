"use client";
import AlertBox from "@/components/AlertBox";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Send } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";

type MsgProps = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MsgProps[]>([
    {
      role: "assistant",
      content:
        "I'm your private and personal AI doctor. How can I help you today?",
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const newMessages: MsgProps[] = [
        ...messages,
        { role: "user", content: input },
      ];
      setMessages(newMessages);
      setInput("");
      const { data } = await axios.post("/api/ai-chat", {
        messages: newMessages,
      });
      setMessages([...newMessages, data]);
    } catch (error) {
      toast(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-200 pt-4">
      <div className="absolute left-5">
        <AlertBox />
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <div className="h-[89vh] overflow-hidden">
          <p className="text-center font-bold bg-blue-100 text-blue-500 mb-2 py-2">
            Your Health Care Assistant
          </p>
          <div className="h-[80%] px-2 overflow-y-scroll pb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role == "user" ? "justify-end" : ""}`}>
                <div
                  className={`rounded-2xl p-2 mb-1 text-black ${
                    msg.role == "user" ? "bg-blue-200" : "bg-background"
                  }`}>
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <p className="rounded-2xl p-2 my-4 text-black bg-background w-min animate-bounce">
                ◾◾◾
              </p>
            )}
            <div ref={bottomRef}></div>
          </div>
          <form onSubmit={handleSend} className="flex">
            <input
              className="w-full border rounded-l border-blue-300 px-2"
              placeholder="Ask about your health issue"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none">
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;
