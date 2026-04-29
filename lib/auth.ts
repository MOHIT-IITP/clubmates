import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type SignInProvider = "github" | "credentials";

const guestModeMessage = {
  message: "Authentication is temporarily disabled. Guest access is enabled.",
};

export async function auth() {
  return null;
}

export async function signIn(_provider?: SignInProvider, _formData?: FormData) {
  redirect("/Select");
}

export async function signOut() {
  redirect("/");
}

export const handlers = {
  GET: async () => NextResponse.json(guestModeMessage),
  POST: async () => NextResponse.json(guestModeMessage),
};
