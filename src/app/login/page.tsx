"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightSquare } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Make Do</h1>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" type="email" required />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <Input value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" type="password" required />
            </div>
            {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
            <Button className="w-full mt-4 flex items-center justify-center gap-2" type="submit" style={{ background: '#264FD6' }}>
              <span className="font-bold">Login</span>
              <ArrowRightSquare size={20} />
            </Button>
          </form>
          <div className="mt-4 text-left text-sm font-bold">
            New user? <a href="/register" className="underline font-bold">Create an account</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 