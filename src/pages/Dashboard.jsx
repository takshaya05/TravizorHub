import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, Bot } from "lucide-react";
import DashboardContent from "./DashboardContent";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [chatMessages, setChatMessages] = useState([
    {
      text: "Hi! Ask me about travel laws...",
      sender: "ai",
      category: "General",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const chatEndRef = useRef(null);

  const countries = ["India", "USA", "UK", "Australia", "Canada"];

  const topics = [
    "Visa",
    "Customs",
    "Transportation",
    "Health",
    "Local Laws",
  ];

  const predefinedQuestions = {
    Visa: {
      India: "What are the visa requirements for India?",
      USA: "What are the visa requirements for USA?",
      UK: "What are the visa requirements for UK?",
      Australia: "What are the visa requirements for Australia?",
      Canada: "What are the visa requirements for Canada?",
    },

    Customs: {
      India: "What items are restricted in India?",
      USA: "What items are restricted in USA?",
      UK: "What items are restricted in UK?",
      Australia: "What items are restricted in Australia?",
      Canada: "What items are restricted in Canada?",
    },

    Transportation: {
      India: "How does transportation work for tourists in India?",
      USA: "How does transportation work for tourists in USA?",
      UK: "How does transportation work for tourists in UK?",
      Australia:
        "How does transportation work for tourists in Australia?",
      Canada: "How does transportation work for tourists in Canada?",
    },

    Health: {
      India: "What health rules should tourists know in India?",
      USA: "What health rules should tourists know in USA?",
      UK: "What health rules should tourists know in UK?",
      Australia:
        "What health rules should tourists know in Australia?",
      Canada: "What health rules should tourists know in Canada?",
    },

    "Local Laws": {
      India: "What local laws should tourists know in India?",
      USA: "What local laws should tourists know in USA?",
      UK: "What local laws should tourists know in UK?",
      Australia:
        "What local laws should tourists know in Australia?",
      Canada: "What local laws should tourists know in Canada?",
    },
  };

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      navigate("/get-started");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  const handleLogout = () => {
    navigate("/get-started");
  };

  const handleSendMessage = async (
    message,
    category = "General"
  ) => {
    if (!message.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setChatMessages((prev) => [
      ...prev,
      {
        text: message,
        sender: "user",
        category,
        timestamp,
      },
    ]);

    setChatInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:11434/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            model: "llama3.2:1b",

            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that explains international travel laws and regulations in simple terms.",
              },

              {
                role: "user",
                content: message,
              },
            ],

            stream: false,
          }),
        }
      );

      const data = await response.json();

      const aiReply =
        data?.message?.content ||
        "⚠️ No response from AI model.";

      setChatMessages((prev) => [
        ...prev,
        {
          text: aiReply,
          sender: "ai",
          category,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "❌ Failed to connect to AI model.",
          sender: "ai",
          category: "Error",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  const handleQuickActionSend = () => {
    if (selectedCountry && selectedTopic) {
      const question =
        predefinedQuestions[selectedTopic][selectedCountry];

      handleSendMessage(question, selectedTopic);

      setQuickActionsOpen(false);
      setSelectedCountry("");
      setSelectedTopic("");
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 text-[#a4d5f1]">

      <div
        className="absolute inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{ backgroundImage: "url('/bgd.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col md:flex-row gap-6">

        <div className="md:w-[30%] flex flex-col gap-4 h-full">

          <div className="bg-[#0b1924]/70 border border-[#5d7d96]/30 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-3">

            <div className="flex items-center gap-2">

              <User className="w-6 h-6 text-[#eecdcd]" />

              <h2 className="text-lg font-semibold text-[#eecdcd]">
                Profile
              </h2>

            </div>

            <div className="flex flex-col gap-1 text-sm text-[#b3d1e2]">

              <span className="font-semibold">
                Name:
                <span className="font-normal">
                  {" "}
                  {user.name}
                </span>
              </span>

              <span className="font-semibold">
                Email:
                <span className="font-normal">
                  {" "}
                  {user.email}
                </span>
              </span>

            </div>

            <button
              onClick={handleLogout}
              className="mt-2 py-2 w-full bg-linear-to-r from-[#5d7d96] to-[#926a42] text-black rounded-lg hover:from-[#926a42] hover:to-[#5d7d96] flex items-center justify-center gap-1 text-sm"
            >

              <LogOut className="w-4 h-4" />

              Logout

            </button>

          </div>

          <div className="flex flex-col flex-1 min-h-0 bg-[#0b1924]/70 border border-[#5d7d96]/30 backdrop-blur-xl rounded-2xl p-4">

            <div className="flex items-center gap-2 mb-3">

              <Bot className="w-5 h-5 text-[#eecdcd]" />

              <h3 className="text-base font-semibold text-[#eecdcd]">
                AI Chatbot
              </h3>

            </div>

            <button
              onClick={() =>
                setQuickActionsOpen(!quickActionsOpen)
              }
              className="px-3 py-2 mb-3 bg-linear-to-r from-[#5d7d96] to-[#926a42] text-black rounded-lg hover:from-[#926a42] hover:to-[#5d7d96] text-sm"
            >
              Quick Actions
            </button>

            {quickActionsOpen && (
              <div className="flex flex-col gap-2 mb-3">

                <select
                  value={selectedCountry}
                  onChange={(e) =>
                    setSelectedCountry(e.target.value)
                  }
                  className="p-2 rounded bg-[#01131a]/80 border border-[#5d7d96]/30 text-[#a4d5f1]"
                >

                  <option value="">
                    Select Country
                  </option>

                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}

                </select>

                <select
                  value={selectedTopic}
                  onChange={(e) =>
                    setSelectedTopic(e.target.value)
                  }
                  className="p-2 rounded bg-[#01131a]/80 border border-[#5d7d96]/30 text-[#a4d5f1]"
                >

                  <option value="">
                    Select Topic
                  </option>

                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}

                </select>

                <button
                  onClick={handleQuickActionSend}
                  className="px-3 py-2 bg-linear-to-r from-[#5d7d96] to-[#926a42] text-black rounded-lg hover:from-[#926a42] hover:to-[#5d7d96] text-sm"
                >
                  Ask
                </button>

              </div>
            )}

            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">

              {chatMessages.length === 0 && (
                <p className="text-[#b3d1e2] italic">
                  No messages yet. Start the chat!
                </p>
              )}

              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl shadow-md wrap-break-word ${
                      msg.sender === "user"
                        ? "bg-linear-to-r from-[#5d7d96] to-[#926a42] text-white rounded-br-none"
                        : "bg-[#01131a]/80 text-[#a4d5f1] rounded-bl-none"
                    }`}
                  >

                    <p className="text-sm">{msg.text}</p>

                    <span className="text-[10px] text-gray-400 mt-1 block text-right">
                      {msg.timestamp} | {msg.category}
                    </span>

                  </div>

                </div>
              ))}

              {loading && (
                <div className="text-sm text-gray-400">
                  🤖 Thinking...
                </div>
              )}

              <div ref={chatEndRef} />

            </div>

            {!quickActionsOpen && (
              <div className="flex gap-2 mt-3">

                <textarea
                  rows={1}
                  value={chatInput}
                  placeholder="Ask about travel laws..."
                  onChange={(e) =>
                    setChatInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      handleSendMessage(chatInput);
                    }
                  }}
                  className="flex-1 p-2 rounded border border-[#5d7d96]/30 bg-[#01131a]/80 text-sm text-[#a4d5f1] focus:outline-none focus:border-[#926a42] resize-none"
                />

                <button
                  onClick={() =>
                    handleSendMessage(chatInput)
                  }
                  disabled={loading}
                  className="px-3 py-2 bg-linear-to-r from-[#5d7d96] to-[#926a42] text-black rounded-lg hover:from-[#926a42] hover:to-[#5d7d96] text-sm"
                >
                  Send
                </button>

                <button
                  onClick={handleClearChat}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                >
                  Clear
                </button>

              </div>
            )}

          </div>

        </div>

        <div className="md:w-[70%] h-full overflow-hidden rounded-2xl">
          <DashboardContent />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;