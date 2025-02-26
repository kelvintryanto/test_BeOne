import { getAllCustomers } from "@/app/models/customer";

export async function GET() {
  try {
    const data = await getAllCustomers();

    return Response.json({ customers: data });
  } catch (error) {
    console.log(error);
  }
}
