import { TAvalible, TNav, TService } from "@/types/constant";
import { Brain, Pill, Stethoscope } from "lucide-react";

export const navItems: TNav[] = [
  { name: "Consult", path: "/consult" },
  { name: "Report", path: "/reports" },
];

export const avaliblity: TAvalible[] = [
  { title: "24/7", subtitle: "AI avaliblity" },
  { title: "95%", subtitle: "Accurate Rate" },
  { title: "10k+", subtitle: "Active Users" },
  { title: "2 min", subtitle: "Avg Response" },
];

export const services: TService[] = [
  {
    icon: Stethoscope,
    title: "Sympton Analysis",
    subtitle: "AI system checker and analysis",
    action: "Check Sympton",
  },
  {
    icon: Pill,
    title: "Medication Guide",
    subtitle: "Smart medication recommendation",
    action: "Get Guidance",
  },
  {
    icon: Brain,
    title: "Mental Health",
    subtitle: "AI mental health assessment",
    action: "Start Assessment",
  },
];

export const systemMessage = `
You are private and personal doctor assistant. 
Your goal is to ask the patient about their health issues, 
refill medications, answer health and lifestyle questions and give medical insights.

Assistant guideline:
Ask their symptoms. 
For how many days they are suffering. 
Give them advice how to take care for their health.
Listen actively and response before moving to next step.
Give up to date information, answer questions, or suggest treatment.

- Ask one by one and wait for the response.
- Avoid robotic phasing-sound natural and conversation.
- Be sure to be polite and professtionals.
- Be short and simple like a real converstion.
`;
