"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function singInWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      console.error("Sign In Error:", result.error.message);
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error(
      "Unexpected Sign In Error:",
      error instanceof Error ? error.message : error
    );
    throw new Error("An unexpected error occurred during sign in.");
  }
}

export async function singUpWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
      },
    });

    if (result.error) {
      console.error("Sign Up Error:", result.error.message);
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error("Unexpected Sign Up Error:", error);
    throw new Error("An unexpected error occurred during sign up.");
  }
}
