import React, { useState } from "react";
import {
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const faqs = [
  {
    q: "How accurate is the AI guidance?",
    a: "Our AI summarizes official legal travel sources and is regularly updated.",
  },
  {
    q: "Can I compare multiple countries?",
    a: "Currently, the platform supports one destination at a time.",
  },
  {
    q: "Is my data secure?",
    a: "Yes, all user data is encrypted and handled with privacy-first protocols.",
  },
  {
    q: "Do I need an account?",
    a: "Yes, registration is required to access full features.",
  },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [flipped, setFlipped] = useState(null);

  const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!nameRegex.test(name)) {
      alert("Name should contain only alphabets");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email format");
      return;
    }

    if (message.length < 5) {
      alert("Message should contain at least 5 characters");
      return;
    }

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-[#f5f7fa] px-6 py-8">

      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{ backgroundImage: "url('/bgd.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4">

        <h1 className="text-4xl font-bold text-center text-[#dfcfc9]">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="border border-[#5d7d96]/30 rounded-2xl p-5 backdrop-blur-xl bg-[#0d1114]/40 flex flex-col gap-2">

            <h2 className="text-xl font-semibold text-center text-[#eecdcd]">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 text-sm"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded-lg border border-[#5d7d96]/30 text-[#a4d5f1] focus:outline-none bg-transparent transition"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="p-2 rounded-lg border border-[#5d7d96]/30 text-[#a4d5f1] focus:outline-none bg-transparent transition"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="p-2 rounded-lg border border-[#5d7d96]/30 text-[#a4d5f1] h-16 resize-none focus:outline-none bg-transparent transition"
                required
              />

              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-linear-to-r from-[#5d7d96] to-[#926a42] hover:from-[#926a42] hover:to-[#5d7d96] transition text-[#000000]"
              >
                Send Message
              </button>

            </form>

          </div>

          <div className="flex flex-col gap-3">

            <div className="border border-[#5d7d96]/30 rounded-2xl p-5 backdrop-blur-xl bg-[#0d1114]/40 text-sm">

              <h2 className="text-xl font-semibold text-center text-[#eecdcd] mb-2">
                Contact Details
              </h2>

              <div className="grid grid-cols-2 gap-3 text-[#a4d5f1]">

                <div className="flex flex-col gap-2">

                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    +91 98765 43210
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail size={16} />
                    travizorhub@gmail.com
                  </p>

                </div>

                <div className="flex flex-col gap-2">

                  <p className="flex items-center gap-2">
                    <Globe size={16} />
                    www.travizorhub.com
                  </p>

                  <div className="flex gap-2 mt-1 text-[#5d7d96]">

                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook
                        size={16}
                        className="cursor-pointer hover:text-[#a4d5f1] transition"
                      />
                    </a>

                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram
                        size={16}
                        className="cursor-pointer hover:text-[#a4d5f1] transition"
                      />
                    </a>

                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter
                        size={16}
                        className="cursor-pointer hover:text-[#a4d5f1] transition"
                      />
                    </a>

                  </div>

                </div>

              </div>

            </div>

            <div className="border border-[#5d7d96]/30 rounded-2xl p-5 backdrop-blur-xl bg-[#0d1114]/40 flex flex-col gap-2 text-sm">

              <h2 className="text-xl font-semibold text-center text-[#eecdcd]">
                FAQs
              </h2>

              <div className="grid gap-2">

                {faqs.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      setFlipped(flipped === idx ? null : idx)
                    }
                    className="cursor-pointer"
                  >

                    <div
                      className={`relative w-full h-14 transition-transform duration-500 transform-3d ${
                        flipped === idx
                          ? "transform-[rotateY(180deg)]"
                          : ""
                      }`}
                    >

                      <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-[#5d7d96]/30 bg-[#11161b]/70 backface-hidden p-3 text-center font-medium text-[#a4d5f1]">
                        {item.q}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-[#5d7d96]/30 bg-[#926a42]/70 transform-[rotateY(180deg)] backface-hidden p-3 text-center text-xs text-[#ffffff]">
                        {item.a}
                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactUs;