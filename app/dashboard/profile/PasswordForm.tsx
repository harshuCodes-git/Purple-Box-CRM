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

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    new_password: z.string().min(8, "Password must be at least 8 characters."),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords don't match",
    path: ["new_password_confirmation"],
  });

export default function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  type FormValues = z.infer<typeof passwordSchema>;

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          new_password: data.new_password,
          new_password_confirmation: data.new_password_confirmation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password");
      }

      form.reset();
      toast({
        title: "Success",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not update password.",
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
          name="password"
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
          name="new_password"
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
          name="new_password_confirmation"
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
