"use client";
import { login, oauth, signup } from "@/app/(auth)/login/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  type: "Sign In" | "Sign Up";
};
const AuthForm = ({ title, type }: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // const supabase = await createClient();
    setIsLoading(true);
    try {
      if (type == "Sign Up") {
        await signup({ email, password });
        toast("Check your email for verification", {
          duration: 3000,
          position: "top-center",
        });
        router.push("/login");
      } else {
        await login({ email, password });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    await oauth("google");
  };

  return (
    <section className="max-w-xl mx-auto">
      <Card>
        <CardContent>
          <h3 className="font-bold text-xl text-center">{title}</h3>

          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={300}
            height={300}
            className="w-48 mx-auto"
          />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1 font-bold">
                Email
              </label>
              <Input
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 font-bold">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" disabled={isLoading}>
              {type}
              {isLoading && <Loader className="animate-spin" />}
            </Button>
          </form>
          <p className="text-center my-5">OR SIGN IN WITH</p>
          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <Mail /> Google
          </Button>
          {type == "Sign Up" ? (
            <p className="text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login here
              </Link>
            </p>
          ) : (
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign up here
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default AuthForm;
