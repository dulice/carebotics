"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = () => {
  const router = useRouter();
  return <ArrowLeft onClick={() => router.back()} />;
};

export default GoBack;
