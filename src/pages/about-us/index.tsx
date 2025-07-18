import React from "react";
import Link from "next/link";

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-8 space-x-4">
                <Link href="/auth/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Register</Link>
            </div>
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Welcome to Cyber Shastra</h1>
                    <p className="mt-2 text-lg text-gray-300">
                        Empowering Investigations with Cutting-Edge Tools
                    </p>
                </div>
                
                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <p className="text-gray-300">
                        Cyber Shastra is a specialized investigative platform built exclusively for law enforcement agencies, government officials, and authorized investigative personnel. In today’s digital age, cyber criminals constantly evolve their techniques, making investigations increasingly complex. Cyber Shastra bridges this gap by offering a suite of advanced, credit-based investigative tools designed to empower agencies with real-time intelligence, data analysis, and forensic capabilities.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-300">
                        At Cyber Shastra, our mission is clear — To equip investigative agencies with powerful, reliable, and secure digital tools that accelerate investigations, enhance evidence gathering, and strengthen the fight against cyber crime.
                    </p>
                    <p className="text-gray-300 mt-4">
                        We believe that technology should simplify complex cases, not add to the burden. With this in mind, every tool offered on Cyber Shastra is designed to be intuitive, investigator-friendly, and aligned with the unique operational challenges faced by law enforcement professionals.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Credit-Based Access:</strong> Agencies can purchase credits in bulk and consume them as per their investigation needs — offering flexibility and cost control.</li>
                        <li><strong>Advanced Investigative Tools:</strong> From digital forensics to open-source intelligence (OSINT), Cyber Shastra provides a wide array of tools designed to uncover hidden digital footprints, trace online identities, and extract actionable intelligence.</li>
                        <li><strong>Tailored for Law Enforcement:</strong> We understand the critical nature of investigations and have built our platform to seamlessly integrate into existing workflows used by investigative teams.</li>
                    </ul>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-gray-300">
                        We envision a future where investigative agencies across India are technologically empowered to combat digital crime with the same speed and sophistication as modern-day cyber criminals. By democratizing access to powerful investigative tools, Cyber Shastra aims to create a safer digital ecosystem for citizens, businesses, and national assets.
                    </p>
                </div>

                <div className="bg-blue-950/50 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-gray-300">Email: <a href="mailto:support@virtualcyberlabs.com" className="text-blue-400 hover:text-blue-300">support@virtualcyberlabs.com</a></p>
                    <p className="text-gray-300">Phone: <a href="tel:+917499413908" className="text-blue-400 hover:text-blue-300">+91 7499413908</a></p>
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
        </div>
    );
};

export default AboutUs;