"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";

const AlertBox = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <ArrowLeft />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Once you leave the chat, it can&apos;t
            be restore.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={goBack}>Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertBox;
