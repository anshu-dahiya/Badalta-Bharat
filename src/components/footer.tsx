"use client"

import { useEffect, useState } from "react";

let footer: React.FC = () => {
    const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage") || "en";
    setLang(storedLang);
  }, []);
    return (
        <div>
            <footer className="bg-green-900 text-white text-center p-4 mt-4">
        &copy; 2025 Badalta Bharat. {lang === "hn"
          ? "अंशु दहिया द्वारा निर्मित."
          : "Made By Anshu Dahiya."}
      </footer>
        </div>
    )
}

export default footer;