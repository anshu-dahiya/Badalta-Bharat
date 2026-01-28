"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

interface Article {
  _id: string;
  title: string;
  shortDescription: string;
  content?: string;
  author?: string;
  category?: string;
  image?: string | any[];
  createdAt: string;
}
interface Data {
  _id: string;
  link: string;
  image: any[] | string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<Article | null>(null);
  const [otherNews, setOtherNews] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);
  let [swipernews, setSwiperNews] = useState<Article[]>([]);

  let [alldata, setAlldata] = useState<Data[]>([]);

  const router = useRouter();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsget`
        );
        const data = await response.json();
        console.log("data", data);
        // setArticles(data.data || []);
        const publishedArticles = (data.data || []).filter(
          (article: Article & { status: string }) =>
            article.status === "published"
        );
        setArticles(publishedArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error("an internal server Error");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  //   useEffect(() => {
  //     if (articles.length === 0) return;
  //     let sortedArticles = [...articles].sort(
  //       (a, b) =>
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     );

  //     let latest = sortedArticles[0] || 'there is no latest news';
  //     let other = sortedArticles.slice(1, 5);
  //     let remaining = sortedArticles.slice(5, 11);
  //     setLatestNews(latest);
  //     setOtherNews(other);
  //     setSwiperNews(remaining);
  //     console.log('remaining images', remaining);
  //   }, [articles]);

  return (
    <div>
      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg font-semibold text-gray-600 animate-pulse">
            Loading news...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Ads Area */}
            {Array.isArray(articles) &&
              articles.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border shadow-md rounded-xl p-4 text-center"
                >
                  <div className="rounded-lg p-3 hover:shadow-inner transition-all duration-200 flex flex-col justify-between h-full">
                    <div className="flex flex-col flex-1">
                      <div className="flex flex-col justify-between h-full">
                        <div className="">
                          {item.image && (
                            <Image
                              src={item.image[0].path}
                              alt={item.title}
                              width={300}
                              height={180}
                              className="mx-auto rounded-md object-cover mb-3 aspect-auto"
                            />
                          )}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                            {item.title}
                          </h2>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/news/${item._id}`}
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
