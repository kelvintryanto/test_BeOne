"use server";

import { getCustomerByEmail } from "@/app/models/customer";
import { comparePass } from "@/app/utils/bcrypt";
import { sign } from "@/app/utils/jwt";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { z } from "zod";
import { cookies } from "next/headers";

interface LoginState {
  error: string | null;
  success: boolean;
  pending: boolean;
  user?: {
    name: string;
    email: string;
  } | null;
  redirect?: string;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    console.log("langkah 1");
    // validation login for user and password
    const parsedData = loginSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        error: "Invalid email or password",
        success: false,
        pending: false,
      };
    }

    console.log("langkah 2");

    // find customer
    const customer = await getCustomerByEmail(parsedData.data.email);
    if (!customer) {
      return {
        error: "Invalid email or password",
        success: false,
        pending: false,
      };
    }

    console.log("langkah 3");
    // verify password
    const isValid = await comparePass(
      parsedData.data.password,
      customer.password
    );
    if (!isValid) {
      return {
        error: "Invalid email or password",
        success: false,
        pending: false,
      };
    }

    console.log("langkah 4");
    // Create JWT token
    const token = await sign({
      id: customer._id.toString(),
      email: customer.email,
      name: customer.name,
      points: customer.points,
    });

    console.log("langkah 5");
    // Set cookie
    ((await cookies()) as unknown as ResponseCookies).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
    });

    console.log("langkah 6");
    return {
      error: null,
      success: true,
      pending: false,
      user: {
        name: customer.name,
        email: customer.email,
      },
      redirect: "/crm/profile",
    };
  } catch (error) {
    console.log(error);
    return { ...prevState, error: "An unexpected error occurred" };
  }
}
