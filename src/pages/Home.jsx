import React from "react";
import { Link } from "react-router-dom";
import { Globe, FileText, Bot, Plane } from "lucide-react";

const services = [
  { icon: <Globe size={32} />, title: "Country Law Comparison", description: "Compare travel legal rules between countries easily." },
  { icon: <FileText size={32} />, title: "Legal Guidance Summary", description: "Simplify complex travel law documents using AI processing." },
  { icon: <Bot size={32} />, title: "AI Chat Assistance", description: "Get real-time travel legal guidance using our chatbot." },
  { icon: <Plane size={32} />, title: "Travel Compliance Check", description: "Verify international travel rule compliance before journey." },
];

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 text-[#f5f7fa] overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{ backgroundImage: "url('/bgd.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative flex flex-col items-center w-full max-w-6xl gap-6 z-10">

        <section className="flex flex-col md:flex-row items-center justify-between w-full gap-5">

          <div className="flex justify-center md:w-1/2">
            <img
              src="/logo.png"
              alt="TravizorHub Logo"
              className="w-35 h-35 md:w-52 md:h-52 object-contain"
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-5 md:w-1/2">

            <h1 className="text-4xl md:text-4xl font-bold text-[#bba8a1]">
              TravizorHub
            </h1>

            <p className="text-lg md:text-xl text-[#ffffff]">
              Your Gateway to Smooth Journeys
            </p>

            <p className="text-sm md:text-base text-[#b3d1e2] max-w-md">
              An AI-powered platform that visualizes country data, risk maps, services, and travel comparisons on interactive maps, while simplifying international travel rules with real-time analysis and intelligent assistance.
            </p>

            <Link
              to="/get-started"
              className="mt-4 px-6 py-3 rounded-xl text-sm text-[#000000] bg-linear-to-r from-[#5d7d96] to-[#926a42] hover:from-[#926a42] hover:to-[#5d7d96] transition-all duration-300"
            >
              Explore Now
            </Link>

          </div>
        </section>

        <section className="w-full max-w-6xl">

          <h2 className="text-2xl md:text-2xl mb-8 text-center text-[#dfcfc9]">
            Our Services
          </h2>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">

            {services.map((service, index) => (
              <div
                key={index}
                className="group p-5 rounded-2xl bg-linear-to-br from-[#1f2a33]/80 to-[#0d1114]/80 border border-[#5d7d96]/30 backdrop-blur-xl hover:bg-linear-to-br hover:from-[#926a42]/80 hover:to-[#5d7d96]/70 hover:border-[#926a42] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-3 text-center"
              >

                <div className="text-[#a4d5f1] group-hover:text-[#000000] group-hover:scale-110 transition duration-300">
                  {service.icon}
                </div>

                <p className="text-lg md:text-xl text-[#eecdcd] group-hover:text-[#ffffff] transition">
                  {service.title}
                </p>

                <p className="text-xs md:text-sm text-[#a4d5f1] group-hover:text-[#000000] transition">
                  {service.description}
                </p>

              </div>
            ))}

          </div>

        </section>

      </div>

    </div>
  );
}
export default Home;