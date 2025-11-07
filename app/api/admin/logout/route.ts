import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (token) {
    await redis.del(`session:${token}`);
  }

  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.delete("admin_token");
  return res;
}
