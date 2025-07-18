// src/pages/auth/forgot-password.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
      router.push("/auth/login");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to send reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Cyberशस्त्र"
            width={112}
            height={112}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-gray-300">
            Enter your email to receive a password reset link
          </p>
        </div>

        {success ? (
          <div className="mt-8 space-y-6">
            <div className="bg-green-500/10 text-green-400 p-4 rounded-lg text-center">
              Password reset link has been sent to your email address. Please
              check your inbox.
            </div>
            <div className="text-center">
              <Link
                href="/auth/login"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
              >
                Return to login
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium mb-2"
              >
                Your Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-blue-950/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "SEND RESET LINK"}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-300">Remember your password? </span>
              <Link
                href="/auth/login"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
              >
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
