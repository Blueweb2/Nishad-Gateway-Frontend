"use client";

import Link from "next/link";
import { ArrowLeft, Send, Instagram, PhoneCall } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white" data-navbar="white">
            {/* FULL WIDTH BACK ROW */}
            <div className="w-full px-6 pt-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-black transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
            </div>

            {/* CONTAINER CONTENT */}
            <div className="max-w-6xl mx-auto px-6">
                {/* Title */}
                <div className="text-center mt-10">
                    <h1 className="text-[54px] md:text-[92px] font-extrabold tracking-tight text-black leading-[0.95]">
                        Nishad Abdurhiman
                    </h1>

                    <p className="mt-4 text-xl md:text-3xl text-gray-500 font-medium">
                        Your Gateway To Saudi Arabia
                    </p>
                </div>

                {/* Contact info row */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Phone */}
                    <div>
                        <p className="text-sm text-gray-400 mb-2">P:</p>
                        <p className="text-lg md:text-xl font-semibold text-black">
                            +966 55 123 4567
                        </p>
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-sm text-gray-400 mb-2">E:</p>
                        <p className="text-lg md:text-xl font-semibold text-black">
                            contact@narsaudi.com
                        </p>
                    </div>

                    {/* Location */}
                    <div>
                        <p className="text-sm text-gray-400 mb-2">L:</p>
                        <p className="text-lg md:text-xl font-semibold text-black">
                            Saudi Arabia (Serving All Regions)
                        </p>
                        <p className="text-lg md:text-xl font-semibold text-black">
                            Riyadh · Jeddah · Dammam
                        </p>

                        <Link
                            href="#"
                            className="inline-block mt-3 text-sm text-green-700 underline underline-offset-4 hover:text-green-800 transition"
                        >
                            Find us here
                        </Link>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-20 flex flex-col md:flex-row items-end justify-between gap-10">
                    {/* Left Card */}
                    <div className="w-full md:w-[380px] bg-gray-50 rounded-[28px] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-black leading-snug">
                            Let’s talk about your <br /> Saudi business journey.
                        </h3>

                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                            We help you choose the right structure, location,
                            <br />
                            and setup — start with a conversation.
                        </p>

                        <div className="mt-8 flex justify-end">
                            <button className="px-7 py-3 rounded-full bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    {/* Social Icons */}

                    {/* Location */}
                    <div className="flex items-start gap-6">
                  

                        {/* Right side icons */}
                        <div className="flex items-center gap-3 mt-6">
                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                            >
                                <FaTelegramPlane className="text-[16px] text-black" />
                            </Link>

                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                            >
                                <FaInstagram className="text-[16px] text-black" />
                            </Link>

                            <Link
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                            >
                                <FaWhatsapp className="text-[16px] text-black" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="h-16" />

        </main>

    );
}
