"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { systemMessage } from "@/constant";
import Vapi from "@vapi-ai/web";
import axios from "axios";
import { Mic, MicOff, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../Loading";
import { supabase } from "@/lib/supabase/client";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

enum CallStatus {
  ACTIVE = "ACITVE",
  INACTIVE = "INACTIVE",
  DISCONNECT = "DISCONNECT",
  ERROR = "ERROR",
}

const Call = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [lastMessage, setLastMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    const onCallStart = () => {
      setcallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log("call ended");
    };

    const onSpeechStart = () => {
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      setIsSpeaking(false);
    };

    const onError = (e: VapiError) => {
      setcallStatus(CallStatus.ERROR);
      console.log(e);
      toast.error(`Error: ${e.errorMsg}`);
    };

    const onMessage = (message: VapiMessage) => {
      console.log(message);
      setLastMessage(message.transcript ?? "");
      if (message.conversation) {
        setConversation(message.conversation);
      }
    };

    startCall();
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("message", onMessage);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("message", onMessage);
    };
  }, []);

  const startCall = () => {
    setErrorMsg(null);
    vapi.start({
      name: "Doctor",
      firstMessage:
        "I'm your private and personal AI doctor. How can I help you today?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
      },
      model: {
        provider: "openai",
        model: "chatgpt-4o-latest",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
        ],
      },
      voice: {
        provider: "11labs",
        voiceId: "sarah",
        speed: 0.9,
        stability: 0.4,
        style: 0.5,
        similarityBoost: 0.8,
        useSpeakerBoost: true,
      },
    });
  };

  const disconnectCall = async () => {
    vapi.stop();
    toast("Meeting has ended");
    setcallStatus(CallStatus.DISCONNECT);
    try {
      const { data } = await axios.post("/api/ai-feedback", {
        conversation,
        userId,
      });

      if (data) {
        const format = JSON.parse(
          data.replace("```json", "").replace("```", "")
        );
        const feedback = await supabase
          .from("feedback")
          .insert([{ ...format, userId }]);
        if (feedback.error) {
          return toast.error(feedback.error.message);
        }
        router.push("/reports");
      }
    } catch (error) {
      setErrorMsg(
        `Error while generate the feedback. Try again. Error:${error}`
      );
      setcallStatus(CallStatus.ACTIVE);
    }
  };

  const mute = () => {
    if (vapi.isMuted()) {
      vapi.setMuted(false);
    } else {
      vapi.setMuted(true);
    }
  };

  const MicIcon = vapi.isMuted() ? <MicOff /> : <Mic />;
  return (
    <>
      {callStatus == CallStatus.INACTIVE ? (
        <div className="mt-5">
          <p className="text-center text-blue-600">
            Connect to the doctor, please wait a moment.
          </p>
          <Loading />
        </div>
      ) : callStatus == CallStatus.DISCONNECT ? (
        <div className="mt-5">
          <p className="text-center text-blue-600">
            Generating your report, please wait a moment...
          </p>
          <p className="text-center text-blue-600">
            This may take sometimes...
          </p>
          <Loading />
        </div>
      ) : errorMsg ? (
        <div className="flex flex-col justify-center items-center bg-red-100 gap-10 rounded-2xl p-5 mt-5">
          <p className="text-red-600">{errorMsg}</p>
          <Button onClick={startCall} className="rounded-full bg-green-600">
            <Phone />
          </Button>
        </div>
      ) : (
        <div>
          <p className="font-bold text-3xl text-center ">Consult Session</p>
          <div>
            <Card className="w-full my-5">
              <CardContent className="z-10 h-64  flex justify-center items-center relative">
                {isSpeaking && (
                  <div className="z-1 absolute top-1/2 left-1/2 -translate-1/2 animate-ping bg-blue-300 w-20 h-20 rounded-full"></div>
                )}
                <Image
                  src="/images/doctor.jpg"
                  alt=""
                  width={600}
                  height={600}
                  className="object-cover rounded-full w-16 h-16 z-2"
                />
              </CardContent>
            </Card>
            <div className="message bg-blue-100 h-8 mb-4 px-4 py-2 rounded-md text-center">
              {lastMessage}
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button onClick={mute} variant="outline" className="rounded-full">
              {MicIcon}
            </Button>
            <Button
              onClick={disconnectCall}
              variant="destructive"
              className="rounded-full">
              <Phone />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Call;
