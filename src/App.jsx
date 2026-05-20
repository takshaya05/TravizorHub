import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Services from "./pages/Services";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col text-[#f5f7fa] overflow-hidden relative">

        <div className="absolute inset-0 -z-10 bg-[#010b13]">
          <div className="w-full h-full bg-gradient-radial from-[#536878]/30 via-[#2c3539]/50 to-[#010b13]/90 opacity-90 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(83,104,120,0.15)_0%,rgba(44,53,57,0.5)_50%,rgba(1,11,19,0.95)_100%)] backdrop-blur-[14px]" />
        </div>

        <header className="fixed top-0 left-0 w-full z-50">
          <Header />
        </header>

        <main className="flex-1 mt-20 mb-16 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;