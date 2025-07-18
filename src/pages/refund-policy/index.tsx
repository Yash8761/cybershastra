import React from "react";
import Link from "next/link";
const RefundPolicy: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-8 space-x-4">
                <Link href="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Register</Link>
            </div>
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Refund Policy</h1>
                    <p className="mt-2 text-lg text-gray-300">
                        Thank you for choosing Cyber Shastra.
                    </p>
                </div>
                
                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Non-Refundable Credits</h2>
                    <p className="text-gray-300">
                        Once credits are purchased and added to your account, they become non-refundable. This is because credits provide immediate access to our investigative tools, data, and intelligence resources.
                    </p>
                    <p className="text-gray-300 mt-4">
                        As these services are consumed on-demand and are highly specialized for investigative purposes, we do not process refunds for any unused or partially used credits.
                    </p>
                </div>
                
                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
                    <p className="text-gray-300">
                        Refunds may only be considered under exceptional circumstances, such as:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 mt-2">
                        <li>Accidental duplicate payments due to a technical error.</li>
                        <li>Failure to deliver access to purchased tools due to a system malfunction on our end, verified by our technical team.</li>
                    </ul>
                    <p className="text-gray-300 mt-4">
                        Any refund requests under these circumstances must be submitted within 7 days of the purchase, with supporting evidence.
                    </p>
                </div>
                
                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Technical Support</h2>
                    <p className="text-gray-300">
                        If you encounter technical issues while using the credits or accessing our tools, please reach out to our support team immediately. We are committed to resolving any genuine issues you face while using the platform.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-gray-300">Email: <a href="mailto:support@virtualcyberlabs.com" className="text-blue-400 hover:text-blue-300">support@virtualcyberlabs.com</a></p>
                    <p className="text-gray-300">Phone: <a href="tel:+917499413908" className="text-blue-400 hover:text-blue-300">+91 7499413908</a></p>
                </div>
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
        </div>
    );
};

export default RefundPolicy;