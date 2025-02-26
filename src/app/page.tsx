import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, ShoppingCart, Building } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          PT ABC Integration System
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-6 w-6" />
                Customer Registration
              </CardTitle>
              <CardDescription>
                Register new customers and sync across CRM, ERP, and POS systems
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Link href="/crm/login" className="flex-1">
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/crm/register" className="flex-1">
                <Button className="w-full">Register</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                POS Transactions
              </CardTitle>
              <CardDescription>
                Process sales transactions and sync with ERP and CRM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pos">
                <Button className="w-full">Open POS System</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                ERP
              </CardTitle>
              <CardDescription>
                Process sales transactions and sync with POS and CRM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/erp">
                <Button className="w-full">Open ERP</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
