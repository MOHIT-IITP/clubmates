import { NextResponse } from "next/server";
import crypto from "crypto";
import { redis } from "@/lib/redis";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASS = "admin@pass";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate a random session token
  const token = crypto.randomBytes(32).toString("hex");

  // Store session for 2 hours (7200 seconds)
  await redis.set(`session:${token}`, JSON.stringify({ email }), { ex: 7200 });

  // Send cookie back
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 7200,
  });

  return res;
}
