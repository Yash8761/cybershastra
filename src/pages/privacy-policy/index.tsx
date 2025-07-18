import React from "react";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-8 space-x-4">
                <Link href="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Register</Link>
            </div>
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Privacy Policy</h1>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">
                        At Cyber Shastra, accessible from <a href="https://www.cybershastra.io/" className="text-blue-400 hover:text-blue-300">https://www.cybershastra.io/</a>, the privacy of our visitors, especially government officials, police personnel, and law enforcement professionals, is of utmost importance to us. This Privacy Policy document outlines the types of information that Cyber Shastra collects and records, and how we use it.
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Consent</h2>
                    <p className="text-gray-300">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p className="text-gray-300">The personal information that you are asked to provide, and the reasons you are asked to provide it, will be made clear to you at the point where we request your data.</p>
                    <p className="text-gray-300 mt-4">If you contact us directly, we may collect information such as your name, organization name, email address, phone number, and the contents of your message.</p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Providing access to investigation tools and resources</li>
                        <li>Operating, maintaining, and improving our website and services</li>
                        <li>Communicating updates, notifications, and relevant service offerings</li>
                        <li>Enhancing the security of our platform</li>
                        <li>Detecting and preventing fraudulent activity or misuse</li>
                    </ul>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg shadow-lg">
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

export default PrivacyPolicy;
