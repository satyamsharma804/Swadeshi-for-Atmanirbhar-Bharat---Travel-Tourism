import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../App";
import { API_ENDPOINTS } from "../config/api";

export default function AdminQueryManagement() {
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [activeQuery, setActiveQuery] = useState(null);
  const [reply, setReply] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/login");
      return;
    }
    fetchQueries();
  }, [navigate, filter]);

  const fetchQueries = async () => {
    setIsLoading(true);
    try {
      const url = filter === "all" 
        ? API_ENDPOINTS.GET_ALL_QUERIES 
        : `${API_ENDPOINTS.GET_ALL_QUERIES}?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        setQueries(data.queries || []);
      } else {
        setQueries([]);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
      setNotification({ type: "error", message: "Failed to load queries" });
      setQueries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!activeQuery || !reply.trim()) {
      setNotification({ type: "error", message: "Please enter a reply" });
      return;
    }
    
    setIsSending(true);
    try {
      const response = await fetch(API_ENDPOINTS.REPLY_TO_QUERY, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          queryId: activeQuery.id || activeQuery._id,
          reply,
        }),
      });
      
      const data = await response.json();
      
      if (data.success || data.status === "success") {
        setNotification({ type: "success", message: data.message || "Reply sent successfully" });
        setReply("");
        setActiveQuery(null);
        // Refresh queries list
        fetchQueries();
      } else {
        setNotification({ type: "error", message: data.message || "Failed to send reply" });
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setNotification({ type: "error", message: "Failed to send reply" });
    } finally {
      setIsSending(false);
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Query Management
          </h1>
          
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-2 rounded-lg text-sm ${
                filter === "all" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All Queries
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-2 rounded-lg text-sm ${
                filter === "pending" 
                  ? "bg-amber-500 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("answered")}
              className={`px-3 py-2 rounded-lg text-sm ${
                filter === "answered" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Answered
            </button>
            <button
              onClick={fetchQueries}
              className="p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg"
              title="Refresh"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Queries List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-4">
              <h2 className="font-medium mb-4 text-lg flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                User Queries ({queries.length})
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : queries.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  No queries found
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 styled-scrollbar">
                  {queries.map((query) => (
                    <div
                      key={query.id}
                      onClick={() => setActiveQuery(query)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        activeQuery?.id === query.id
                          ? "bg-blue-500/30 border border-blue-500/50"
                          : "bg-gray-700/50 hover:bg-gray-700 border border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium truncate" title={query.subject}>
                          {query.subject}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          query.status === "answered" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-amber-500/20 text-amber-300"
                        }`}>
                          {query.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-400 flex justify-between">
                        <span>{query.user_name}</span>
                        <span>{new Date(query.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Query Details */}
          <div className="lg:col-span-2">
            {activeQuery ? (
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">{activeQuery.subject}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    activeQuery.status === "answered" 
                      ? "bg-green-500/20 text-green-300" 
                      : "bg-amber-500/20 text-amber-300"
                  }`}>
                    {activeQuery.status}
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-2">From: {activeQuery.user_name} ({activeQuery.user_email})</div>
                  <div className="text-sm text-gray-400 mb-4">Date: {new Date(activeQuery.created_at).toLocaleString()}</div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="text-blue-300 mb-2 text-sm">User's Query:</h3>
                    <p>{activeQuery.message}</p>
                  </div>
                </div>
                
                {activeQuery.reply ? (
                  <div className="mb-6">
                    <div className="bg-gray-700/50 p-4 rounded-lg border-l-4 border-green-500">
                      <h3 className="text-green-300 mb-2 text-sm">Your Reply:</h3>
                      <p>{activeQuery.reply}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        Answered on {new Date(activeQuery.updated_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2">Your Reply</label>
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                      placeholder="Type your response here..."
                    />
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleReplySubmit}
                        disabled={isSending || !reply.trim()}
                        className={`px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all ${
                          isSending || !reply.trim() ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSending ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : "Send Reply"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center h-full min-h-[300px]">
                <div className="text-6xl mb-4">📨</div>
                <h3 className="text-xl font-medium text-gray-400 mb-2">Select a query</h3>
                <p className="text-gray-500 text-center">
                  Select a query from the list to view details and reply
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
