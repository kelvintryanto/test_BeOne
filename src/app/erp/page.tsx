"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ERPPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    const response = await fetch("/api/erp/customers");
    const data = await response.json();
    setCustomers(data.customers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mx-auto">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">ERP Page</h1>
              <h3 className="text-xl mb-4">Read Customer</h3>
            </div>
            <Link
              href={"/"}
              className="rounded-md border py-2 px-4 hover:bg-gray-300"
              type="button"
            >
              Back to Home
            </Link>
          </div>

          <div className="m-5 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">No</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow key={index}>
                    <TableHead className="text-center">{index + 1}</TableHead>
                    <TableHead>{customer._id.toString()}</TableHead>
                    <TableHead>{customer.name}</TableHead>
                    <TableHead>{customer.email}</TableHead>
                    <TableHead>{customer.points}</TableHead>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
