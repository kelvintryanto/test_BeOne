"use client";

import { useState } from "react";
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
import { ShoppingCart } from "lucide-react";
import type { TransactionItem } from "@/types";

export default function POSPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState<TransactionItem[]>([
    {
      productId: "PROD-001",
      quantity: 1,
      price: 100,
      subtotal: 100,
    },
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const transaction = {
      customerId: formData.get("customerId") as string,
      items: items,
      total: items.reduce((sum, item) => sum + item.subtotal, 0),
      paymentMethod: formData.get("paymentMethod") as string,
    };

    try {
      if (result.success) {
        setSuccess(true);
        setItems([
          {
            productId: "PROD-001",
            quantity: 1,
            price: 100,
            subtotal: 100,
          },
        ]);
      } else {
        setError(result.error || "Transaction failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    setItems(
      items.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity,
            subtotal: quantity * item.price,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              POS Transaction
            </CardTitle>
            <CardDescription>Process a new transaction</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  name="customerId"
                  required
                  placeholder="Enter customer ID"
                />
              </div>

              <div className="space-y-4">
                <Label>Items</Label>
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    <Input
                      value={item.productId}
                      disabled
                      className="col-span-1"
                    />
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value) || 0)
                      }
                      min="1"
                      className="col-span-1"
                    />
                    <Input
                      value={`$${item.price.toFixed(2)}`}
                      disabled
                      className="col-span-1"
                    />
                    <Input
                      value={`$${item.subtotal.toFixed(2)}`}
                      disabled
                      className="col-span-1"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input
                  id="paymentMethod"
                  name="paymentMethod"
                  required
                  placeholder="Cash/Card"
                />
              </div>

              <div className="text-right text-lg font-semibold">
                Total: $
                {items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}
              {success && (
                <div className="text-sm text-green-500">
                  Transaction completed successfully!
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Complete Transaction"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
