"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function isLogin() {
   const session = await auth();
   if (!session) redirect("/sign-in");
}