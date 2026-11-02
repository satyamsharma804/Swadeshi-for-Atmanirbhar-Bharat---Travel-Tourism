import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  FaRobot, 
  FaTimes, 
  FaPlane, 
  FaTrain, 
  FaBus, 
  FaCar, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaCopy, 
  FaCheck, 
  FaMagic, 
  FaCompass, 
  FaRegLightbulb,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("generator"); // 'generator' | 'chat'
  
  // Itinerary Form State
  const [destination, setDestination] = useState("Goa");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("moderate"); // budget | moderate | luxury
  const [transport, setTransport] = useState("train"); // flight | train | bus | cab
  const [group, setGroup] = useState("friends"); // solo | couple | family | friends
  const [loading, setLoading] = useState(false);
  const [itineraryResult, setItineraryResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedDay, setExpandedDay] = useState(1);

  // Chat State
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! 🙏 I am your **Swadeshi AI Travel Assistant**.\n\nTell me where you want to go, your travel days, budget, or preferred transport — I will create a tailored day-by-day plan with cost estimates for you!"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Form Submit
  const handleGenerateItinerary = async (e) => {
    if (e) e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setItineraryResult(null);

    try {
      const response = await axios.post(API_ENDPOINTS.CHATBOT_ITINERARY, {
        destination,
        days,
        budget,
        transport,
        group
      });

      if (response.data?.success) {
        setItineraryResult(response.data.data);
        setExpandedDay(1);
      }
    } catch (err) {
      console.error("Error generating itinerary:", err);
      // Fallback local generated response if backend proxy encounters delay
      setItineraryResult({
        name: destination,
        tagline: `${days}-Day Customized Journey across ${destination}`,
        bestTime: "October to March",
        transportRecommendation: `Book ${transport.toUpperCase()} in advance. Use local cabs or auto-rickshaws for sightseeing.`,
        budgetBreakdown: {
          tier: budget,
          perPersonTotal: budget === "budget" ? days * 1800 : (budget === "luxury" ? days * 8500 : days * 4200),
          breakdown: {
            stay: Math.round((days * (budget === "budget" ? 1800 : (budget === "luxury" ? 8500 : 4200))) * 0.45),
            food: Math.round((days * (budget === "budget" ? 1800 : (budget === "luxury" ? 8500 : 4200))) * 0.25),
            transport: Math.round((days * (budget === "budget" ? 1800 : (budget === "luxury" ? 8500 : 4200))) * 0.20),
            activities: Math.round((days * (budget === "budget" ? 1800 : (budget === "luxury" ? 8500 : 4200))) * 0.10)
          }
        },
        travelGroup: group,
        dayPlans: Array.from({ length: days }, (_, i) => ({
          day: i + 1,
          title: i === 0 ? `Arrival & Scenic Highlights of ${destination}` : (i === days - 1 ? `Local Cultural Walks, Shopping & Farewell` : `Exploring Top Attractions & Landscapes - Day ${i + 1}`),
          morning: `Early morning exploration of iconic viewpoints and historical heritage spots.`,
          afternoon: `Enjoy authentic local delicacies at traditional food hubs followed by sightseeing.`,
          evening: `Relaxing sunset viewpoint and dinner at recommended local cultural eateries.`
        }))
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Chat Message Submit
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(API_ENDPOINTS.CHATBOT_MESSAGE, { message: text });
      if (response.data?.success) {
        setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      // Smart fallback
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `I'd love to help with your trip! Switch to the **Quick Planner** tab above to generate a complete ${destination} itinerary with costs, or tell me your preferred days and budget tier!`
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Copy Itinerary Text
  const handleCopyItinerary = () => {
    if (!itineraryResult) return;
    let text = `✈️ ITINERARY FOR ${itineraryResult.name.toUpperCase()}\n`;
    text += `Duration: ${days} Days | Budget: ${budget.toUpperCase()} (₹${itineraryResult.budgetBreakdown.perPersonTotal.toLocaleString('en-IN')}/person)\n`;
    text += `Transport: ${transport.toUpperCase()} | Group: ${group}\n`;
    text += `Best Time to Visit: ${itineraryResult.bestTime}\n\n`;
    
    itineraryResult.dayPlans.forEach(dp => {
      text += `📅 DAY ${dp.day}: ${dp.title}\n`;
      text += `🌅 Morning: ${dp.morning}\n`;
      text += `☀️ Afternoon: ${dp.afternoon}\n`;
      text += `🌆 Evening: ${dp.evening}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all border border-cyan-300/30 font-medium"
        >
          <div className="relative">
            <FaRobot className="text-xl animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black animate-ping" />
          </div>
          <span className="text-sm font-semibold tracking-wide hidden sm:inline">Swadeshi AI Trip Planner</span>
        </motion.button>
      </div>

      {/* Main Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 sm:right-6 w-[95vw] sm:w-[480px] max-h-[82vh] bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden text-neutral-100"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
                  <FaCompass className="text-lg animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                    Swadeshi AI Planner
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-normal">
                      Online
                    </span>
                  </h3>
                  <p className="text-[11px] text-neutral-400">Custom Day-by-Day Itinerary & Budget</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-neutral-800 bg-neutral-900/60 text-xs">
              <button
                onClick={() => setActiveTab("generator")}
                className={`flex-1 py-2.5 font-medium flex items-center justify-center gap-1.5 transition ${
                  activeTab === "generator"
                    ? "text-cyan-400 border-b-2 border-cyan-500 bg-cyan-500/10"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <FaCalendarAlt /> Quick Planner
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2.5 font-medium flex items-center justify-center gap-1.5 transition ${
                  activeTab === "chat"
                    ? "text-cyan-400 border-b-2 border-cyan-500 bg-cyan-500/10"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <FaRobot /> AI Chat Assistant
              </button>
            </div>

            {/* TAB 1: QUICK ITINERARY GENERATOR */}
            {activeTab === "generator" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {!itineraryResult ? (
                  <form onSubmit={handleGenerateItinerary} className="space-y-3.5">
                    {/* Destination Selection */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-medium flex items-center gap-1">
                        <FaMapMarkerAlt className="text-cyan-400" /> Destination
                      </label>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Goa, Manali, Kerala, Jaipur, Varanasi..."
                        className="w-full bg-neutral-900 border border-neutral-750 rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                        required
                      />
                      {/* Popular Quick Suggestions */}
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {["Goa", "Manali", "Kerala", "Jaipur", "Varanasi", "Leh Ladakh"].map((city) => (
                          <button
                            type="button"
                            key={city}
                            onClick={() => setDestination(city)}
                            className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
                              destination.toLowerCase() === city.toLowerCase()
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500"
                                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                            }`}
                          >
                            {city}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Days Selection */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-medium flex items-center gap-1">
                        <FaCalendarAlt className="text-cyan-400" /> Trip Duration (Days)
                      </label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[2, 3, 4, 5, 7].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setDays(num)}
                            className={`py-1.5 rounded-lg border text-center font-semibold transition ${
                              days === num
                                ? "bg-cyan-500 text-black border-cyan-400"
                                : "bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-850"
                            }`}
                          >
                            {num} Days
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget Category */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-medium flex items-center gap-1">
                        <FaMoneyBillWave className="text-cyan-400" /> Expense Budget
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "budget", label: "Budget", sub: "₹1,500/day" },
                          { id: "moderate", label: "Moderate", sub: "₹4,000/day" },
                          { id: "luxury", label: "Luxury", sub: "₹8,500+/day" }
                        ].map((b) => (
                          <button
                            type="button"
                            key={b.id}
                            onClick={() => setBudget(b.id)}
                            className={`p-2 rounded-lg border text-left transition ${
                              budget === b.id
                                ? "bg-cyan-500/15 border-cyan-400 text-cyan-300"
                                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <div className="font-semibold text-white">{b.label}</div>
                            <div className="text-[10px] text-neutral-400">{b.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Transport */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-medium flex items-center gap-1">
                        <FaPlane className="text-cyan-400" /> Transport Preference
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: "train", icon: <FaTrain />, label: "Train" },
                          { id: "flight", icon: <FaPlane />, label: "Flight" },
                          { id: "bus", icon: <FaBus />, label: "Bus" },
                          { id: "cab", icon: <FaCar />, label: "Cab" }
                        ].map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setTransport(t.id)}
                            className={`py-2 px-1 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                              transport === t.id
                                ? "bg-blue-600/20 border-blue-400 text-blue-300"
                                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <span className="text-sm">{t.icon}</span>
                            <span className="text-[10px]">{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Group Style */}
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1 font-medium flex items-center gap-1">
                        <FaUsers className="text-cyan-400" /> Travel Companions
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {["Solo", "Couple", "Family", "Friends"].map((g) => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGroup(g.toLowerCase())}
                            className={`py-1.5 rounded-lg border text-center transition text-[11px] ${
                              group === g.toLowerCase()
                                ? "bg-indigo-600/20 border-indigo-400 text-indigo-300 font-semibold"
                                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Custom Plan...</span>
                        </>
                      ) : (
                        <>
                          <FaMagic /> Generate Smart Itinerary
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ITINERARY RESULT DISPLAY */
                  <div className="space-y-3.5">
                    {/* Header Summary Card */}
                    <div className="p-3 bg-gradient-to-br from-neutral-900 to-neutral-850 rounded-xl border border-neutral-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-base text-white">{itineraryResult.name}</h4>
                          <p className="text-[11px] text-cyan-400 font-medium">{itineraryResult.tagline}</p>
                        </div>
                        <button
                          onClick={handleCopyItinerary}
                          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-750 text-neutral-300 border border-neutral-700 transition"
                        >
                          {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>

                      {/* Best time badge */}
                      <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                        <span className="text-amber-400">☀️ Best Time:</span> {itineraryResult.bestTime}
                      </div>

                      {/* Budget breakdown */}
                      <div className="mt-2 pt-2 border-t border-neutral-800">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-[11px] text-neutral-400">Estimated Total (per person):</span>
                          <span className="text-sm font-bold text-emerald-400">
                            ₹{itineraryResult.budgetBreakdown.perPersonTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-[10px] text-neutral-400 text-center">
                          <div className="bg-neutral-900 p-1 rounded border border-neutral-800">
                            Stay: ₹{itineraryResult.budgetBreakdown.breakdown.stay.toLocaleString("en-IN")}
                          </div>
                          <div className="bg-neutral-900 p-1 rounded border border-neutral-800">
                            Food: ₹{itineraryResult.budgetBreakdown.breakdown.food.toLocaleString("en-IN")}
                          </div>
                          <div className="bg-neutral-900 p-1 rounded border border-neutral-800">
                            Travel: ₹{itineraryResult.budgetBreakdown.breakdown.transport.toLocaleString("en-IN")}
                          </div>
                          <div className="bg-neutral-900 p-1 rounded border border-neutral-800">
                            Acts: ₹{itineraryResult.budgetBreakdown.breakdown.activities.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>

                      {/* Transport Advice */}
                      <div className="mt-2 p-2 rounded bg-blue-950/30 border border-blue-900/40 text-[11px] text-blue-200">
                        <span className="font-semibold">🚆 Transport Guide:</span> {itineraryResult.transportRecommendation}
                      </div>
                    </div>

                    {/* Day by Day Plan Accordion */}
                    <div className="space-y-2">
                      <h5 className="font-bold text-neutral-300 text-xs flex items-center gap-1.5">
                        <FaCalendarAlt className="text-cyan-400" /> Day-by-Day Itinerary Plan
                      </h5>

                      {itineraryResult.dayPlans.map((dp) => (
                        <div
                          key={dp.day}
                          className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50"
                        >
                          <button
                            type="button"
                            onClick={() => setExpandedDay(expandedDay === dp.day ? null : dp.day)}
                            className="w-full px-3 py-2 text-left font-medium flex justify-between items-center bg-neutral-900 hover:bg-neutral-850 transition"
                          >
                            <span className="text-xs text-white">
                              <span className="font-bold text-cyan-400 mr-1.5">Day {dp.day}:</span> {dp.title}
                            </span>
                            {expandedDay === dp.day ? <FaChevronUp /> : <FaChevronDown />}
                          </button>

                          {expandedDay === dp.day && (
                            <div className="p-3 space-y-2 text-[11px] text-neutral-300 border-t border-neutral-800/80 bg-neutral-950/40">
                              <div>
                                <span className="font-semibold text-amber-300">🌅 Morning:</span> {dp.morning}
                              </div>
                              <div>
                                <span className="font-semibold text-orange-300">☀️ Afternoon:</span> {dp.afternoon}
                              </div>
                              <div>
                                <span className="font-semibold text-purple-300">🌆 Evening:</span> {dp.evening}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/select-destination");
                        }}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition text-center shadow-lg"
                      >
                        Book This Trip Now ✈️
                      </button>
                      <button
                        onClick={() => setItineraryResult(null)}
                        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition border border-neutral-700"
                      >
                        New Plan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: AI CHAT ASSISTANT */}
            {activeTab === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Messages stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm leading-relaxed whitespace-pre-line ${
                          m.sender === "user"
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none"
                            : "bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-bl-none px-3.5 py-2 text-neutral-400 flex items-center gap-1.5 text-xs">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick suggestions chips */}
                <div className="px-3 py-2 bg-neutral-900/60 border-t border-neutral-800/80 flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
                  {[
                    "3-Day Goa Budget Trip",
                    "5-Day Manali Family Plan",
                    "Romantic Kerala Backwaters",
                    "Jaipur Weekend by Car"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendMessage(chip)}
                      className="px-2.5 py-1 rounded-full bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 text-neutral-300 whitespace-nowrap transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input area */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-3 bg-neutral-900 border-t border-neutral-800 flex gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about days, budget, cabs, trains..."
                    className="flex-1 bg-neutral-950 border border-neutral-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition disabled:opacity-40"
                  >
                    <FaPaperPlane className="text-xs" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
