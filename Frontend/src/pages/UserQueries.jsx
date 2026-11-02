import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuestionCircle, FaReply, FaClock, FaCheckCircle } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";

export default function UserQueries() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [activeTab, setActiveTab] = useState("new");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    
    if (!token || !email) {
      navigate("/login");
      return;
    }
    
    setUserEmail(email);
    setUserName(name || "User");
    fetchQueries(email);
  }, [navigate]);
  
  const fetchQueries = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.GET_USER_QUERIES}?email=${email}`);
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        setQueries(data.queries || []);
      } else {
        console.error("Error fetching queries:", data.message);
        setQueries([]);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
      setNotification({ type: "error", message: "Failed to load your queries. Please try again." });
      setQueries([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      setNotification({ type: "error", message: "Please fill out all fields" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.SUBMIT_QUERY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
          subject,
          message
        }),
      });
      
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        setNotification({ type: "success", message: data.message || "Query submitted successfully" });
        setSubject("");
        setMessage("");
        // Refetch queries to show the new one
        fetchQueries(userEmail);
        setActiveTab("history");
      } else {
        setNotification({ type: "error", message: data.message || "Failed to submit query" });
      }
    } catch (error) {
      console.error("Error submitting query:", error);
      setNotification({ type: "error", message: "Failed to submit your query. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: "", message: "" });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Ask Us Anything
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Have questions about your travels or our services? Submit your query and our team will get back to you as soon as possible.
          </p>
        </motion.div>
        
        {/* Notification */}
        <AnimatePresence>
          {notification.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-lg ${
                notification.type === "success"
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-red-500/20 border border-red-500/30"
              }`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 backdrop-blur-md p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "new"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              New Query
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-5 py-2 rounded-lg transition-all duration-300 ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              Query History
            </button>
          </div>
        </div>
        
        {/* New Query Form */}
        {activeTab === "new" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex items-center mb-6">
              <FaQuestionCircle className="text-pink-400 text-xl mr-3" />
              <h2 className="text-2xl font-semibold">Submit a New Query</h2>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/30 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What's your question about?"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/30 text-white p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32 resize-none"
                  placeholder="Please provide details about your query..."
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Query"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
        
        {/* Query History */}
        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaReply className="text-pink-400 text-xl mr-3" />
                <h2 className="text-2xl font-semibold">Your Query History</h2>
              </div>
              
              <button
                onClick={() => fetchQueries(userEmail)}
                className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center p-8">
                <svg className="animate-spin h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : queries.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <p>You haven't submitted any queries yet.</p>
                <button
                  onClick={() => setActiveTab("new")}
                  className="mt-4 text-purple-400 hover:text-purple-300"
                >
                  Submit your first query
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {queries.map((query) => (
                  <motion.div
                    key={query.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-black/20 rounded-xl p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg">{query.subject}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs flex items-center ${
                        query.status === "answered" 
                          ? "bg-green-500/20 text-green-300" 
                          : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {query.status === "answered" ? (
                          <><FaCheckCircle className="mr-1" /> Answered</>
                        ) : (
                          <><FaClock className="mr-1" /> Pending</>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-1">Your question:</div>
                      <p className="text-gray-200">{query.message}</p>
                    </div>
                    
                    {query.reply && (
                      <div className="mt-4 bg-white/5 p-3 rounded-lg border-l-2 border-purple-500">
                        <div className="text-sm text-gray-400 mb-1">Admin reply:</div>
                        <p className="text-gray-200">{query.reply}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 text-xs text-gray-400">
                      Submitted on {new Date(query.created_at).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
