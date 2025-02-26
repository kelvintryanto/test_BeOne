import { createCustomer } from "@/app/models/customer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = await createCustomer(body);

    if (!result)
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });

    return NextResponse.json({
      success: true,
      message: "Customer created successfully",
      customerId: result.insertedId,
    });
  } catch (error) {
    console.log(error);
  }
}
