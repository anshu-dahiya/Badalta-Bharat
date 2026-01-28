"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ Correct way to get params
import Image from "next/image";
import { toast } from "react-toastify";
import { Calendar, PenLine } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface data {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  author: string;
  image: any[];
  createdAt: string;
}

const NewsById = () => {
  const [article, setArticle] = useState<data | null>(null);
  const params = useSearchParams(); 
  const id = params.get('id'); 

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsgetbyid/${id}`);
        const data = await response.json();
        if (data.error) {
          console.error("Error:", data.error);

          return;
        }
        setArticle(data);
      } catch (error) {
        console.error("API Fetch Error:", error);
        toast.error('API Fetch Error');
      }
    };
    fetchNews();
  }, [id]);
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white px-4 py-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardContent className="p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 leading-tight mb-6">
            {article?.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 mb-8">
            {article?.createdAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" /><strong>Published On: {" "}</strong>
                <span className=" text-sm text-gray-400">
                  {new Date(article.createdAt).toLocaleString("en-IN", {
                   dateStyle: "full",
                  })}
                </span>
              </div>
            )}
            {article?.author && (
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">{article.author}</span>
              </div>
            )}
          </div>

          {article?.image && (
            <div className="w-full h-[400px] relative rounded-xl overflow-hidden shadow-md mb-8">
              <Image
                src={article.image[0].path}
                alt={article.title}
                fill
                priority 
                className="object-cover object-center"
              />
            </div>
          )}

          <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
            {article?.shortDescription}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="prose max-w-none prose-lg text-gray-800 leading-8 whitespace-pre-line"  dangerouslySetInnerHTML={{__html:  article?.content ?? '' }}
          >
           
          </motion.div>

          {article?.author && (
            <div className="mt-10 text-right text-sm italic text-gray-400">
              — {article.author}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  </section>
);
};
  
export default NewsById;
