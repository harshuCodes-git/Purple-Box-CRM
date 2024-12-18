"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getSupabaseFrontendClient } from "@/lib/supabase/client";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters."),
    newPassword: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = getSupabaseFrontendClient();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      form.reset();
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white/5 text-white p-3 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Change Password</h2>

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="border-primary-purple"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="border-primary-purple"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className="border-primary-purple"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={isLoading} className="bg-primary-purple">
          Update Password
        </Button>
      </form>
    </Form>
  );
}
