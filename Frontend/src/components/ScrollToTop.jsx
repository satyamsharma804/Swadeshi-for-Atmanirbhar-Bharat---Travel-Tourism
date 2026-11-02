
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsArrowUp } from "react-icons/bs";

export default function ScrollToTop() {
  const [scrollState, setScrollState] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setScrollState(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-10 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all transform ${
        scrollState ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
      } hover:bg-blue-700`}
    >
      <BsArrowUp className="w-6 h-6" />
    </button>
  );
}
