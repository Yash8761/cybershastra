// src/components/common/RazorpayWallet.tsx
import React, { useState, useEffect, useCallback } from "react";
import { RefreshCw, Plus } from "lucide-react";
import apiClient, { getUserProfile } from "@/lib/api-client";

// Types
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface ApiError {
  message: string;
  response?: {
    status: number;
    data: {
      error: string;
    };
  };
  name?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Constants
const MIN_AMOUNT = 5;
const MAX_CREDITS = 4999;
const PRESET_AMOUNTS = [500, 1000, 1500];
const RAZORPAY_KEY = "rzp_live_cj7p38TK7a9gjx";

const RazorpayWallet = () => {
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Try to get token from both localStorage and cookie
    const token = localStorage.getItem("token") || getCookie("token");
    setAuthToken(token);
  }, []);

  // Helper function to get cookie
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const handleAuthError = useCallback(() => {
    // Clear token from both localStorage and cookie
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuthToken(null);
    setError("Session expired. Please login again");

    // Redirect to login page
    window.location.href = "/login";
  }, []);

  const fetchCredits = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserProfile();
      setCredits(data.credits);
      setError("");
    } catch (err) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        setError("Failed to load profile");
        console.error("Profile fetch error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const loadRazorpay = async (): Promise<boolean> => {
    if (typeof window.Razorpay !== "undefined") return true;

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount: number) => {
    if (!authToken) {
      handleAuthError();
      return null;
    }

    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify({ amount: amount * 100 }),
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to create order");
    }
    return data.data;
  };

  const handleVerifyPayment = async (
    response: RazorpayResponse,
    amount: number
  ): Promise<boolean> => {
    try {
      if (!authToken) {
        handleAuthError();
        return false;
      }

      setIsLoading(true);
      setError("");

      const payload = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        amount: Number(amount),
        token: authToken,
      };

      const verifyResponse = await apiClient.post("/verify_payment", payload);

      const result = verifyResponse.data;
      console.log(result);
      console.log(verifyResponse.data.success);
      if (!result) {
        throw new Error(result.error || "Payment verification failed");
      }

      await fetchCredits();
      setShowAmountModal(false);
      setCustomAmount("");
      setSuccessMessage("Payment successful! Credits added to your wallet.");
      return true;
    } catch (err: unknown) {
      const error = err as ApiError;

      if (error.response?.status === 401) {
        handleAuthError();
      } else if (error.name === "NetworkError") {
        setError("Network error. Please check your connection");
      } else if (error.response?.status === 400) {
        setError(error.response.data.error || "Invalid payment details");
      } else {
        setError(error.message || "Payment verification failed");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (amount: string | number): Promise<void> => {
    const amountValue = typeof amount === "string" ? parseInt(amount) : amount;
    if (isNaN(amountValue) || amountValue < MIN_AMOUNT) {
      setError(`Minimum amount should be ₹${MIN_AMOUNT}`);
      return;
    }

    // Check if adding this amount would exceed MAX_CREDITS
    if (credits + amountValue > MAX_CREDITS) {
      setError(
        `Maximum credit limit is ${MAX_CREDITS}. You can add up to ₹${
          MAX_CREDITS - credits
        }`
      );
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) throw new Error("Razorpay SDK failed to load");

      const order = await createRazorpayOrder(amountValue);
      if (!order) return; // Handle case where order creation failed

      const options = {
        key: RAZORPAY_KEY,
        amount: amountValue * 100,
        currency: "INR",
        name: "CyberShastra Credits",
        description: `${amountValue} credits`,
        order_id: order.id,
        handler: (response: RazorpayResponse) =>
          handleVerifyPayment(response, amountValue),
        prefill: { email: "", contact: "" },
        theme: { color: "#2563EB" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err: unknown) {
      const error = err as ApiError;
      setError(error.message || "Payment initialization failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowAmountModal(false);
    setCustomAmount("");
    setError("");
  };

  // Calculate remaining allowed credits
  const remainingAllowedCredits = MAX_CREDITS - credits;

  // Filter preset amounts that would exceed the max limit
  const availablePresetAmounts = PRESET_AMOUNTS.filter(
    (amount) => amount <= remainingAllowedCredits
  );

  return (
    <div className="relative">
      <div className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <button
          onClick={fetchCredits}
          className="group transition-transform duration-500"
          disabled={isLoading}
        >
          <RefreshCw
            className={`w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors ${
              isLoading ? "animate-spin" : ""
            }`}
          />
        </button>

        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-1">
            <span className="font-semibold text-sm text-gray-800">
              {credits.toLocaleString()}
            </span>
            <span className="hidden md:inline text-xs text-gray-500 font-medium">
              API wallet
            </span>
          </div>
          <div className="h-0.5 bg-blue-500/10 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((credits / MAX_CREDITS) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setShowAmountModal(true)}
          className="group relative p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
        </button>
      </div>

      {showAmountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full mx-2">
            <h3 className="text-sm font-semibold mb-2">Add Credits</h3>

            <div className="text-xs text-red-600 font-medium mb-2">
              ⚠️ Please <strong>do not use the UPI QR code</strong> shown on the
              Razorpay payment screen. Instead, use the{" "}
              <strong>Enter UPI ID</strong> option, or pay via{" "}
              <strong>Credit/Debit Card</strong>.<br />
              For more clarity, check out this
              <a
                href="https://cybershastra.io/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
              >
                tutorial
              </a>
              .
            </div>

            {remainingAllowedCredits <= 0 ? (
              <div className="text-xs text-red-500 mb-2">
                You&apos;ve reached the maximum credit limit of {MAX_CREDITS}.
              </div>
            ) : (
              <div className="text-xs text-gray-500 mb-2">
                You can add up to {remainingAllowedCredits} more credits.
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 mb-2">
              {availablePresetAmounts.length > 0 ? (
                availablePresetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handlePayment(amount)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium text-xs transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))
              ) : (
                <div className="col-span-3 text-xs text-gray-500">
                  No preset amounts available within your remaining limit.
                </div>
              )}
            </div>

            {remainingAllowedCredits >= MIN_AMOUNT && (
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Custom Amount (Min ₹{MIN_AMOUNT}, Max ₹
                  {remainingAllowedCredits})
                </label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min={MIN_AMOUNT}
                    max={remainingAllowedCredits}
                    placeholder="Enter amount"
                    className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                  />
                  <button
                    onClick={() => handlePayment(customAmount)}
                    disabled={
                      !customAmount ||
                      parseInt(customAmount) < MIN_AMOUNT ||
                      parseInt(customAmount) > remainingAllowedCredits
                    }
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-xs"
                  >
                    Pay
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleModalClose}
              className="w-full px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-medium text-xs transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-full left-0 mt-1 p-1 bg-red-50 text-red-600 rounded-md text-xs">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="absolute top-full left-0 mt-1 p-1 bg-green-50 text-green-600 rounded-md text-xs">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default RazorpayWallet;
