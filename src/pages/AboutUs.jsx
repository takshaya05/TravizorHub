import React from "react";
import { Rocket, User } from "lucide-react";

function AboutUs() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-10">

      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{ backgroundImage: "url('/bgd.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-6">

        <h1 className="text-4xl font-bold text-center text-[#dfcfc9]">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">

          <img
            src="/logo.png"
            alt="TravizorHub Logo"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
          />

          <div className="flex flex-col text-left gap-1">

            <h2 className="text-3xl md:text-2xl font-semibold text-[#eecdcd]">
              TravizorHub
            </h2>

            <p className="text-base md:text-lg text-[#d5e5ee]">
              Your Gateway to Smooth Journeys
            </p>

            <p className="text-sm md:text-base text-[#d5e5ee] max-w-md">
              Simplifying international travel laws with AI-powered insights
              and guidance.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 w-full">

          <div className="group border border-[#5d7d96]/30 backdrop-blur-xl bg-[#0d1114]/40 rounded-2xl p-4 flex flex-col hover:-translate-y-1 hover:bg-linear-to-br hover:from-[#926a42]/80 hover:to-[#5d7d96]/70 hover:border-[#926a42] transition-all duration-300">

            <div className="flex items-center justify-start gap-2 mb-2 text-[#a4d5f1] group-hover:text-[#000000] transition duration-300">

              <Rocket size={24} />

              <h3 className="text-xl md:text-xl font-semibold group-hover:text-[#ffffff] transition">
                Our Mission
              </h3>

            </div>

            <p className="text-base text-[#a4d5f1] group-hover:text-[#000000] leading-relaxed transition">
              TravizorHub simplifies international travel by providing quick
              access to country-specific visa rules, travel laws, and entry
              requirements. Our mission is to make global travel planning
              easier through AI-powered legal assistance and smart information
              retrieval.
            </p>

          </div>

          <div className="group border border-[#5d7d96]/30 backdrop-blur-xl bg-[#0d1114]/40 rounded-2xl p-4 flex flex-col hover:-translate-y-1 hover:bg-linear-to-br hover:from-[#926a42]/80 hover:to-[#5d7d96]/70 hover:border-[#926a42] transition-all duration-300">

            <div className="flex items-center justify-start gap-2 mb-2 text-[#a4d5f1] group-hover:text-[#000000] transition duration-300">

              <User size={24} />

              <h3 className="text-xl md:text-xl font-semibold group-hover:text-[#ffffff] transition">
                Developer Details
              </h3>

            </div>

            <p className="text-base text-[#a4d5f1] group-hover:text-[#000000] leading-relaxed transition">
              TravizorHub was developed as a smart travel assistance platform
              focused on simplifying complex international travel regulations
              using modern web technologies.
            </p>

            <ul className="mt-2 text-sm text-[#a4d5f1] space-y-1 group-hover:text-[#000000] transition">

              <li>Technology Stack: React, Vite, Tailwind CSS</li>

              <li>Focus: AI-powered travel law and visa guidance</li>

              <li>Goal: Provide fast, reliable travel legal assistance</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AboutUs;