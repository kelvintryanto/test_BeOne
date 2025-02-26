"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Customer } from "@/types";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Customer | null>(null);
  const router = useRouter();

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/crm/profile");
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch session:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();

    // Listen for auth changes
    window.addEventListener("auth-change", checkSession);
    return () => {
      window.removeEventListener("auth-change", checkSession);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/crm/logout", {
        method: "POST",
      });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              Customer Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline space-y-2">
              <Label className="w-1/3">Name</Label>
              <Label className="w-2/3 font-normal">{user?.name}</Label>
            </div>
            <div className="flex items-baseline space-y-2">
              <Label className="w-1/3">Email</Label>
              <Label className="w-2/3 font-normal">{user?.email}</Label>
            </div>
            <div className="flex items-baseline space-y-2">
              <Label className="w-1/3">Points</Label>
              <Label className="w-2/3 font-normal">{user?.points}</Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleLogout}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging out..." : "Log Out"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
