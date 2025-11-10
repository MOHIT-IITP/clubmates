import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome, Admin 👑</h1>
      <p>{session?.user?.name}</p>
      <img
        src={session?.user?.image}
        alt="Profile Picture"
        width={100}
        height={100}
        className="rounded-full"
      />
      <p>{session?.user?.email}</p>
    </div>
    );
  }
  