"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

interface Article {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  author?: string;
  category?: string;
  image?: { path: string }[];
  createdAt: string;
}

const NewsDetailsPage: React.FC = () => {
  const { id } = useParams(); // Get the dynamic route param
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsgetbyid/${id}?language=${selectedLanguage}`);
        const data = await res.json();
        console.log('data',data)
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading article...</div>;
  }

  if (!article) {
    return <div className="text-center text-red-600 mt-10">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{article.title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        {/* {article.author && <span>By {article.author}</span>} •{" "} */}
        {new Date(article.createdAt).toLocaleDateString()}
        {article.category && <> • <span>{article.category}</span></>}
      </div>

      {article.image?.[0]?.path && (
        <Image
          src={article.image[0].path}
          alt={article.title}
          width={800}
          height={400}
          className="rounded-lg mb-6 object-cover"
        />
      )}

      <div className="prose max-w-none prose-lg text-gray-800">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <p>No content available for this article.</p>
        )}
      </div>

      <div className="mt-10 border-t pt-6 text-sm text-gray-600">
        <p>Thanks for reading!</p>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
