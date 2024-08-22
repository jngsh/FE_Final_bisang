import { useState, useEffect } from "react";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="scrollTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`end-0 ${isVisible ? "" : "visually-hidden"}`}
    >
    </div>
  );
}
