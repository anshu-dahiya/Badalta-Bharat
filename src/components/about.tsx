"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import DOMPurify from 'dompurify';

let about: React.FC = () => {
  interface Data {
    text: string;
  }
  let [companydetails, setCompanyDetails] = useState<Data>({
    text: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  let fetchalldetails = async () => {
    try {
      let response = await fetch("/api/auth/detailsget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.ok) {
        setCompanyDetails(data.Companydetails);
      }
    } catch (error) {
      console.error("error fetching details", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchalldetails();
  }, []);
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
            <p className="text-gray-500 text-sm">Loading company info...</p>
          </div>
        ) : companydetails ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <p
            className="text-lg text-gray-700 leading-relaxed mt-4"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(companydetails.text) }}
          />

          </motion.div>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No company information available.</p>
          </div>
        )} 
        
      </section>
    </div>
  );
};

export default about;
