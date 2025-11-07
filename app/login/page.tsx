"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen border-2 border-gray-300 bg-white flex items-center justify-center">
      <div className="border p-6 rounded-xl w-96 shadow  bg-gray-200">
        <h2 className="text-xl font-bold text-black mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 text-black border-gray-100 rounded-lg placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 text-black border-gray-100  rounded-lg placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex gap-2 ">
        <button
          onClick={()=> router.push("/")}
          className="bg-gray-600 text-white w-full py-2 rounded-lg hover:bg-gray-700 shadow-lg hover:shadow-md"
        >
          Home
        </button>
        <button
          onClick={handleLogin}
          className="bg-gray-600 text-white w-full py-2 rounded-lg hover:bg-gray-700 shadow-lg hover:shadow-md"
        >
          Login
        </button>
        </div>
      </div>
    </div>
  );
}
