"use server";

import { createClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
  email: string;
  password: string;
};

export async function login({ email, password }: Props) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({ email, password }: Props) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw Error(error.message);
  }
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw Error(error.message);
  }
  redirect("/login");
}

export async function oauth(provider: Provider) {
  const url = process.env.NEXT_PUBLIC_CLIENT_URL;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${url}/auth/callback`,
    },
  });
  if (error) {
    throw Error(error.message);
  }

  if (data.url) {
    // console.log(data);
    return redirect(data.url);
  }
}
