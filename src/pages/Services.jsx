import React from "react";
import { Globe, Bot, Scale, ShieldCheck } from "lucide-react";

const servicesList = [
  {
    icon: <Globe size={34} />,
    title: "Country Law Data Collection",
    description:
      "Fetch travel legal documents from official government and embassy sources.",
  },
  {
    icon: <Bot size={34} />,
    title: "AI Legal Summarization",
    description:
      "Simplify complex legal texts using NLP intelligence processing.",
  },
  {
    icon: <Scale size={34} />,
    title: "Law Comparison Engine",
    description:
      "Compare travel laws between home and destination countries.",
  },
  {
    icon: <ShieldCheck size={34} />,
    title: "AI Chat Assistance",
    description:
      "Get real-time guidance through smart chatbot interaction.",
  },
];

function Services() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-10">

      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{ backgroundImage: "url('/bgd.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-4">

        <h1 className="text-4xl font-bold text-center text-[#dfcfc9]">
          Our Services
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          {servicesList.map((service, index) => (
            <div
              key={index}
              className="group p-4 rounded-2xl border border-[#5d7d96]/30 backdrop-blur-xl bg-[#0d1114]/40 hover:bg-linear-to-br hover:from-[#926a42]/80 hover:to-[#5d7d96]/70 hover:border-[#926a42] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-2"
            >

              <div className="text-[#a4d5f1] group-hover:text-[#000000] group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-[#eecdcd] group-hover:text-[#ffffff] transition">
                {service.title}
              </h3>

              <p className="text-xs md:text-sm text-[#a4d5f1] group-hover:text-[#000000] leading-relaxed transition">
                {service.description}
              </p>

            </div>
          ))}

        </div>

        <section className="w-full max-w-3xl mx-auto mt-4 flex flex-col gap-1">

          <h2 className="text-3xl font-semibold text-[#eecdcd] text-center">
            How to Use TravizorHub
          </h2>

          <div className="group border border-[#5d7d96]/30 backdrop-blur-xl bg-[#0d1114]/40 rounded-2xl p-4 text-sm md:text-base flex flex-col gap-1 transition-all duration-300 hover:bg-linear-to-br hover:from-[#926a42]/80 hover:to-[#5d7d96]/70 hover:border-[#926a42]">

            <p className="text-[#a4d5f1] group-hover:text-[#000000]">
              • Select home and destination countries
            </p>

            <p className="text-[#a4d5f1] group-hover:text-[#000000]">
              • View summarized legal travel rules
            </p>

            <p className="text-[#a4d5f1] group-hover:text-[#000000]">
              • Compare laws between both countries
            </p>

            <p className="text-[#a4d5f1] group-hover:text-[#000000]">
              • Ask the AI chatbot for guidance
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Services;