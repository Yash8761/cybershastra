import React, { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);
      if (response) {
        router.push("/");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
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
          <h1 className="mt-6 text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-sm text-gray-300">
            Restricted Access to Law Enforcement and Certified Cyber
            Criminologists
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-blue-950/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-blue-950/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-300">Not registered? </span>
            <Link
              href="/auth/register"
              className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-400">
        <nav className="space-x-4">
          <Link href="/about-us" className="hover:text-white">About Us</Link>
          <span>|</span>
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          <span>|</span>
          <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
        </nav>
      </footer>
    </div>
  );
}