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
interface Data{
  _id: string;
  link: string;
  image: any[] | string
}

const NewsFetch: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [latestNews, setLatestNews] = useState<Article | null>(null);
  const [otherNews, setOtherNews] = useState<Article[]>([]);
  const selectedLang = typeof window !== 'undefined' 
  ? localStorage.getItem('selectedLanguage') || 'en' 
  : 'en';
  const [loading, setLoading] = useState(true);
  let [swipernews, setSwiperNews] = useState<Article[]>([]);
  console.log('swipernews', swipernews)

  let [alldata, setAlldata] = useState<Data[]>([]);

  const router = useRouter();
 ;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsget?language=${selectedLang}`);
        const data = await response.json();
        // setArticles(data.data || []);
        const publishedArticles = (data.data || []).filter(
          (article: Article & { status: string }) => article.status === "published"
        );
        setArticles(publishedArticles);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast.error('an internal server Error');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;
    let sortedArticles = [...articles].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    let latest = sortedArticles[0] || 'there is no latest news';
    let other = sortedArticles.slice(1, 5);
    let remaining = sortedArticles.slice(5, 11);
    setLatestNews(latest);
    setOtherNews(other);
    setSwiperNews(articles);
    // console.log('remaining images', remaining);
  }, [articles]);
  let fetchads = async ()=>{
    try {
      let response = await fetch('/api/auth/adsget', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await response.json();
      console.log(data, 'data');
      if(response.ok){
        setAlldata(data.alldata);
      }
    } catch (error) {
      console.error('getting an error', error);
    }
  }
  useEffect(()=>{
    fetchads();
  }, [])
  return (
    <div>
     
     <div className="container mx-auto p-4">
    {loading ? (
      <p className="text-center text-lg font-semibold text-gray-600 animate-pulse">
        {selectedLang === 'en' ? 'Loading news...' : 'समाचार लोड हो रहा है...'}
      </p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ads Area */}
        <div className="bg-white border shadow-md rounded-xl p-4 flex flex-col items-center">
  <h2 className="font-bold text-xl text-center text-amber-700 mb-3">
    {selectedLang === 'en' ? 'Sponsored Ads' : 'प्रायोजित विज्ञापन'}
  </h2>

  {alldata.length > 0 && alldata[0]?.image?.length > 0 && (
    <Link
      href={`https://${alldata[0].link}`}
      target="_blank"
    >
      <Image
        src={alldata[0].image[0].path}
        alt="ads"
        width={400}
        height={100}
        className="rounded-lg object-cover"
      />
    </Link>
  )}
</div>
          

            <div className="bg-white border shadow-md rounded-xl p-4 text-center">
              <h2 className="font-bold text-xl text-amber-700 mb-4">
                {selectedLang === 'en' ? 'Top News' : 'मुँह समाचार'}
              </h2>
              {latestNews && (
                <div className="rounded-lg p-3 hover:shadow-inner transition-all duration-200">
                  {latestNews.image && (  
                    <Image
                      src={latestNews.image[0].path}
                      alt={latestNews.title}
                      width={300}
                      height={180}
                      className="mx-auto rounded-md object-cover mb-3"
                    />
                  )}
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {latestNews.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {latestNews.shortDescription}
                  </p>
                  <Link
                    href={`/news/${latestNews._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {selectedLang === 'en' ? 'Read more →' : 'और पढ़ें →'}
                  </Link>
                </div>
              )}
            </div>
            <div className="bg-white border shadow-md rounded-xl p-4">
              <h2 className="font-bold text-xl text-center text-amber-700 mb-4">
                {selectedLang === 'en' ? 'More News' : 'अधिक समाचार'}
              </h2>
              {otherNews.length > 0 ? (
                <ul className="space-y-3">
                  {otherNews.map((article) => (
                    <li
                      key={article._id}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-150"
                      onClick={() => router.push(`/news/${article._id}`)}
                    >
                      <h3 className="text-gray-800 font-medium truncate hover:text-blue-600 transition">
                        {article.title}
                      </h3>
                    </li>
                  ))}
                    <p className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-150 font-medium hover:text-blue-600"><a href="/news">{selectedLang === 'en' ? 'Get All News →' : 'सभी समाचार देखें →'}</a></p>
                </ul>
               
              ) : (
                <p className="text-sm text-gray-500">
                  {selectedLang === 'en' ? 'No other news available.' : 'कोई और समाचार उपलब्ध नहीं है.'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Carousel */}
      {/* <div className="container mx-auto my-8">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          loop={true}
          className="w-full rounded-xl shadow-lg"
        >
          {swipernews
      .filter((article) => article.image?.[0]?.path)
      .map((article) => (
                  <SwiperSlide key={article._id}>
                    <Link href={`/news/${article._id}`}>
                      <div className="relative w-full h-[500px] rounded-xl overflow-hidden group" style={{backgroundImage: `url(${article.image![0].path})`, backgroundSize: 'cover',  backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                          <h2 className="text-white text-2xl md:text-3xl font-bold drop-shadow-md">
                            {article.title}
                          </h2>
                          <p className="text-yellow-300 text-sm mt-1 line-clamp-2">
                            {article.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
        </Swiper>
      </div> */}

    
    </div>
  );
};

export default NewsFetch;



 {/* Header Section */}
      {/* <div className="container mx-auto p-4">
        <h1 className="text-red-500 text-center text-2xl font-bold">
          Welcome to
        </h1>
        <div className="flex items-center justify-center">
          <Image
            src="/images/one.png"
            alt="badalata-bharat-logo"
            width={500}
            height={150}
          />
        </div>
        <span className="flex justify-center mt-2">
          <strong>
            {currentTime.toLocaleString()}, {dayName}
          </strong>
        </span>
      </div> */}

      {/* Navbar */}
      {/* <div className="container mx-auto bg-white p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/one.png"
              alt="Badalta Bharat Logo"
              width={300}
              height={100}
            />
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            ☰
          </button>
          <ul
            className={`w-full lg:w-auto lg:flex lg:items-center lg:space-x-6  ${
              isNavOpen ? "block" : "hidden"
            } lg:flex`}
          >
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
              {" "}
              <a href="">Home</a>{" "}
            </li>
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
              {" "}
              <a href="/about">About</a>
            </li>
            <li className="p-2 relative group">
              <button
                className="flex items-center "
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              >
                Gallery <span className="ml-2">▼</span>
              </button>
              <ul
                className={`absolute mt-2 bg-white text-black  w-32 shadow-md rounded ${
                  isGalleryOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <a href="/images" className="block p-2">
                    Images
                  </a>
                </li>
                <li>
                  <a href="/allpdfgets" className="block p-2">
                    PDF
                  </a>
                </li>
              </ul>
            </li>
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
            <a href="/contact">Contact Us</a> 
            </li>
          </ul>
        </div>
      </div> */}
  {/* Footer */}
      {/* <footer className="bg-green-900 text-white text-center p-4 mt-4">
        &copy; 2025 Badalta Bharat. All rights reserved by Anshu Dahiya.
      </footer> */}