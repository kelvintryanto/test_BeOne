"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { loginAction } from "./action";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [state, dispatch] = useActionState(loginAction, {
    error: null,
    success: false,
    pending: false,
  });

  useEffect(() => {
    if (state.redirect) {
      window.location.href = state.redirect;
    }
  }, [state.redirect, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-6 w-6" />
            Customer Login
          </CardTitle>
          <CardDescription>Login to your customer account</CardDescription>
          {state.error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-200 border border-red-500/20">
              {state.error}
            </div>
          )}
        </CardHeader>
        <form action={dispatch}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {"Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
