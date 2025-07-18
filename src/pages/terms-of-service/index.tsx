import React from "react";
import Link from "next/link";

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-8 space-x-4">
                <Link href="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Register</Link>
            </div>
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Terms and Conditions</h1>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">
                        Welcome to Cyber Shastra. These Terms and Conditions outline the rules and regulations for the use of our platform, accessible at <a href="https://www.cybershastra.io" className="text-blue-400 hover:text-blue-300">www.cybershastra.io</a>.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">1. Eligibility</h2>
                    <p className="text-gray-300">
                        Cyber Shastra is exclusively intended for government officials, police officers, law enforcement agencies, and authorized investigative personnel. Unauthorized access is strictly prohibited.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">2. Services Offered</h2>
                    <p className="text-gray-300">
                        Cyber Shastra provides credit-based access to investigative tools, reports, and intelligence resources for cyber crime investigation and digital forensics.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">3. Use of the Platform</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Users must maintain confidentiality regarding platform tools and data.</li>
                        <li>Misuse, unauthorized sharing, or commercial exploitation is strictly prohibited.</li>
                    </ul>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">4. Accounts and Security</h2>
                    <p className="text-gray-300">Users must keep their login credentials confidential and report unauthorized access immediately.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">5. Payment and Credits</h2>
                    <p className="text-gray-300">Credits are purchased in advance, non-refundable, and expire after 12 months if unused.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">6. Data Privacy and Security</h2>
                    <p className="text-gray-300">We collect and process data as per our <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
                    <p className="text-gray-300">Our services are provided &quot;as-is&quot; without warranties of any kind.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                    <p className="text-gray-300">Cyber Shastra is not liable for any loss, data corruption, or operational delays resulting from platform usage.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                    <p className="text-gray-300">We reserve the right to modify these terms. Continued use of the platform implies acceptance of any updates.</p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                    <p className="text-gray-300">These terms are governed by the laws of India, and disputes fall under Maharashtra jurisdiction.</p>
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

export default TermsOfService;