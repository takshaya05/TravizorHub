import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputField = ({ label, instruction, name, type, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-[#a4d5f1]">{label}</label>
    <span className="text-xs text-[#a4d5f1] leading-tight">{instruction}</span>
    <input
      type={type}
      name={name}
      className="w-full p-2.5 rounded-lg border border-[#5d7d96]/30 focus:outline-none focus:border-[#926a42] text-sm text-[#a4d5f1] bg-transparent"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

function GetStarted() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[0-9]{6}$/;

  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!nameRegex.test(signupData.name)) { alert("Only alphabets allowed in name"); return; }
    if (!emailRegex.test(signupData.email)) { alert("Enter valid email format"); return; }
    if (!passwordRegex.test(signupData.password)) { alert("Password must be 6 digit numeric PIN"); return; }
    localStorage.setItem("user", JSON.stringify({ name: signupData.name, email: signupData.email, password: signupData.password }));
    alert("Account created successfully. Login now.");
    setSignupData({ name: "", email: "", password: "" });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) { alert("No account found. Please sign up first."); return; }
    if (loginData.email !== storedUser.email) { alert("Invalid email"); return; }
    if (loginData.password !== storedUser.password) { alert("Incorrect password"); return; }
    alert("Logged in successfully");
    navigate("/dashboard", { state: { user: storedUser } });
  };

  const handleForgotPassword = () => { alert("Password reset link sent to your email"); };

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-6 py-10 gap-8">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center text-[#dfcfc9]">Get Started</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-[#5d7d96]/30 rounded-2xl p-4 backdrop-blur-xl flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-center text-[#eecdcd]">Sign Up</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSignupSubmit}>
              <InputField label="Full Name" instruction="Only alphabets (John Smith)" name="name" type="text" value={signupData.name} onChange={handleSignupChange} />
              <InputField label="Email" instruction="user@gmail.com" name="email" type="email" value={signupData.email} onChange={handleSignupChange} />
              <InputField label="PIN Password" instruction="6 digit numeric PIN only" name="password" type="password" value={signupData.password} onChange={handleSignupChange} />
              <button className="w-full bg-linear-to-r from-[#5d7d96] to-[#926a42] text-[#000000] py-2.5 rounded-xl hover:from-[#926a42] hover:to-[#5d7d96] transition text-sm mt-1">Create Account</button>
            </form>
          </div>
          <div className="border border-[#5d7d96]/30 rounded-2xl p-4 backdrop-blur-xl flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-center text-[#eecdcd]">Login</h2>
            <form className="flex flex-col gap-3" onSubmit={handleLoginSubmit}>
              <InputField label="Email" instruction="user@gmail.com" name="email" type="email" value={loginData.email} onChange={handleLoginChange} />
              <InputField label="PIN Password" instruction="6 digit numeric PIN only" name="password" type="password" value={loginData.password} onChange={handleLoginChange} />
              <div className="flex flex-col gap-2 mt-2">
                <button className="w-full bg-linear-to-r from-[#5d7d96] to-[#926a42] text-[#000000] py-2.5 rounded-xl hover:from-[#926a42] hover:to-[#5d7d96] transition text-sm">Login</button>
                <button type="button" onClick={handleForgotPassword} className="text-xs text-[#a4d5f1] hover:text-[#5d7d96] text-right">Forgot Password?</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;