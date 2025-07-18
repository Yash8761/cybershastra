import React from 'react';

export default function TutorialPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="https://www.cybershastra.io">
            <img src="/logo.png" alt="Cybershastra Logo" className="h-14 sm:h-16 w-auto" />
          </a>
          <a
            href="https://www.cybershastra.io"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition"
          >
            Back to Main Site
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">🚀 Getting Started</h2>
          <p className="text-lg text-gray-600">
            Follow the steps below to register, verify, and start using Cybershastra securely.
          </p>
        </section>

        {/* Steps Section */}
        <section className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 1: Register</h3>
            <p>
              Go to{' '}
              <a
                href="https://www.cybershastra.io/auth/register"
                className="text-blue-500 underline"
              >
                cybershastra.io/auth/register
              </a>{' '}
              and fill in your correct details.
              <span className="block mt-1 text-red-600 font-medium">
                Make sure to enter proper details, including a valid address — incomplete or fake registrations will be rejected.
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 2: Activate Email</h3>
            <p>Check your inbox and click the activation link sent to your email after registering.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 3: Account Verification</h3>
            <p>
              Wait for <strong>up to 24 hours</strong> for verification. If not verified, message us on
              WhatsApp: <strong className="text-blue-600">9324078256</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 4: Login</h3>
            <p>
              Once verified, go to{' '}
              <a
                href="https://www.cybershastra.io/auth/login"
                className="text-blue-500 underline"
              >
                cybershastra.io/auth/login
              </a>{' '}
              and log in.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 5: Add Credits</h3>
            <p>Inside your dashboard, go to the <strong>API</strong> section to add credits:</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>
                Do <strong>not</strong> scan the QR code, as it is not working from <strong>Razorpay</strong>&apos;s side.
                This will cause issues. <span className="text-red-600 font-medium">DON&apos;T USE IT.</span>
              </li>
              <li>
                Click on <strong>UPI</strong>, enter your UPI ID, and click <strong>Verify & Pay</strong>.
              </li>
              <li>
                You may also use <strong>Netbanking or Card</strong> for payment.
              </li>
            </ul>

            {/* Video */}
            <div className="mt-4">
              <video controls className="w-full rounded-lg shadow-lg border border-gray-300">
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">✅ Step 6: You&apos;re Ready!</h3>
            <p>
              Once payment is successful, credits will be added to your account. You can now start exploring Cybershastra&apos;s tools and services.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-6 border-t">
        © 2025 Cybershastra.io — All rights reserved.
      </footer>
    </div>
  );
}
