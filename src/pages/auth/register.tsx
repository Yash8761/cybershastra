// src/pages/auth/register.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "@/services/authService";
import { toast } from "react-toastify";
import { RegisterFormData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    dob: "",
    phone: "",
    address: "",
    pin_code: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  // Validation function remains the same
  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+91[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be in format: +91XXXXXXXXXX";
    }

    if (!formData.pin_code) {
      newErrors.pin_code = "PIN code is required";
    } else if (!/^[0-9]{6}$/.test(formData.pin_code)) {
      newErrors.pin_code = "Invalid PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register(formData);
      toast.success("Registration successful! Please login.");
      if (response) {
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "phone" && !value.startsWith("+91")
        ? { phone: "+91" + value }
        : {}),
    }));
  };

  const inputClassName =
    "appearance-none relative block w-full px-4 py-3 border border-gray-700 rounded-lg bg-blue-950/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out";
  const labelClassName = "block text-sm font-medium mb-2 text-white";
  const errorClassName = "mt-1 text-sm text-red-400";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 relative">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Cyberशस्त्र"
            width={112}
            height={112}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-bold">Create Account</h1>
          {/* <p className="mt-2 text-sm text-gray-300">
            Fill in your details to create your account
          </p> */}
          <p className="mt-2 text-sm text-gray-300">
            Restricted Access to Law Enforcement and Certified Cyber
            Criminologists
          </p>
        </div>

        <div className="mt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className={labelClassName}>
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.first_name && (
                  <p className={errorClassName}>{errors.first_name}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className={labelClassName}>
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.last_name && (
                  <p className={errorClassName}>{errors.last_name}</p>
                )}
              </div>
            </div>

            {/* Username and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="username" className={labelClassName}>
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.username && (
                  <p className={errorClassName}>{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClassName}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.email && (
                  <p className={errorClassName}>{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className={labelClassName}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.password && (
                  <p className={errorClassName}>{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="password2" className={labelClassName}>
                  Confirm Password
                </label>
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  required
                  value={formData.password2}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.password2 && (
                  <p className={errorClassName}>{errors.password2}</p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dob" className={labelClassName}>
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.dob && <p className={errorClassName}>{errors.dob}</p>}
              </div>

              <div>
                <label htmlFor="phone" className={labelClassName}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  className={inputClassName}
                />
                {errors.phone && (
                  <p className={errorClassName}>{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className={labelClassName}>
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={inputClassName}
              />
              {errors.address && (
                <p className={errorClassName}>{errors.address}</p>
              )}
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="pin_code" className={labelClassName}>
                  PIN Code
                </label>
                <input
                  id="pin_code"
                  name="pin_code"
                  type="text"
                  required
                  value={formData.pin_code}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.pin_code && (
                  <p className={errorClassName}>{errors.pin_code}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className={labelClassName}>
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.city && <p className={errorClassName}>{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="state" className={labelClassName}>
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClassName}
                />
                {errors.state && (
                  <p className={errorClassName}>{errors.state}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "CREATE ACCOUNT"}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-300">Already have an account? </span>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/auth/login"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
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
