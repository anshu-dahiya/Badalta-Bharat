"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type NewsItem = {
  _id: any;
  title: string;
  image: string
};

interface pdfs {
  _id: string;
  file: string;
  createdAt: string;
}
let navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [newsHeadlines, setNewsHeadlines] = useState<NewsItem[]>([]);
  let [newpdf, setnewpdf] = useState<pdfs[]>([]);
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hn', label: 'Hindi' },
  ];
  useEffect(() => {
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    setSelectedLang(storedLang);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsget?language=${selectedLang}`
        );
        const data = await res.json();
        setNewsHeadlines((data?.data || []).slice(0, 5));
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    const getpdfhandler = async () => {
      try {
        let response = await fetch(`/api/auth/pdfget?language=${selectedLang}`);
        let data = await response.json();
        if (response.ok) {
          setnewpdf(data.pdfs);
        }
      } catch (error) {
        console.error("an internal server Error", error);
      }
    };

    fetchNews();
    getpdfhandler();
  }, [selectedLang]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);
    localStorage.setItem('selectedLanguage', lang);
    window.location.reload(); // Or use a global context to avoid reload
  };
  const router = useRouter();
  const currentTime = new Date();
  const hindiDays = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const englishDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = selectedLang === 'en' ? englishDays[currentTime.getDay()] : hindiDays[currentTime.getDay()];
  // const dayName = days[currentTime.getDay()];
  return (
    <div>
      <div className="container mx-auto p-4">
        {/* <h1 className="text-red-500 text-center text-2xl font-bold">
          Welcome to
        </h1> */}
        <div className="grid grid-flow-row grid-cols-3 gap-4">
          <div className="flex items-center gap-6">
            <Image
              src={selectedLang === "en"
                ? newsHeadlines[0]?.image[0].path
                : newsHeadlines[0]?.image[0].path}
              alt="badalata-bharat-logo"
              width={200}
              height={150}
            />
            {/* {Array.isArray(newpdf) &&
              newpdf.map((pdf, _id) => ( */}
                <div className="col-span-12 sm:col-span-6 lg:col-span-4 ">
                  {/* <a
                    href={pdf.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    {selectedLang === 'en' ? 'Download Latest PDF' : 'नवीनतम पीडीएफ डाउनलोड करें'}
                  </a> */}
                  <iframe src={newpdf[0]?.file} width={200} height={100} className="w-full h-50">
                  </iframe>
                </div>
              {/* ))} */}
          </div>
          <div>
            <Image
              src={selectedLang === 'en' ? '/images/Eng Logo.png' : '/images/Hindi Logo.png'}
              alt="badalata-bharat-logo"
              width={500}
              height={150}
            />
          </div>
          <div className="flex items-center justify-center gap-5">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/facebook.jpg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/x.jpg" alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src="/images/insta.jpg" alt="Instagram" width={24} height={24} />
            </a>
          </div>

        </div>

        <span className="flex justify-center mt-2">
          <strong>
            {currentTime.toLocaleString()}, {dayName}
          </strong>
        </span>
      </div>

      {/* Navbar */}
      <div className="container mx-auto bg-white p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={selectedLang === 'en' ? '/images/Eng Logo.png' : '/images/Hindi Logo.png'}
              alt="Badalta Bharat Logo"
              width={200}
              height={100}
            />
          </div>
          {/* Marquee or Scrolling News */}
          <div className="flex-1 mx-4 overflow-hidden whitespace-nowrap">
            {/* <div className="marquee-container text-red-600 font-semibold text-sm" style={{
              animation: "marquee 15s linear infinite",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}> */}
            <div className="marquee-content">
              {newsHeadlines.map((news, index) => (
                <Link
                  key={index}
                  href={`/news/${news._id}`}
                  className="inline-block mr-8 hover:underline"
                >
                  📰 {news.title}
                </Link>
              ))}
            </div>
            {/* <marquee width="60%" direction="left" height="100px">
                {newsHeadlines.map((news, index) => (
                  <span key={index}>{news.title}</span>
                ))}
              </marquee> */}

            {/* </div> */}
          </div>
          <button
            className="lg:hidden p-2"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            ☰
          </button>

          <ul
            className={`w-full lg:w-auto lg:flex lg:items-center lg:space-x-6  ${isNavOpen ? "block" : "hidden"
              } lg:flex`}
          >
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
              {" "}
              <a href="/">{selectedLang === 'en' ? 'Home' : 'होम'}</a>{" "}
            </li>
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
              {" "}
              <a href="/about">{selectedLang === 'en' ? 'About' : 'अबाउट'}</a>
            </li>
            <li className="p-2 relative group">
              <button
                className="flex items-center "
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              >
                {selectedLang === 'en' ? 'Gallery' : 'गैलरी'} <span className="ml-2">▼</span>
              </button>
              <ul
                className={`absolute mt-2 bg-white text-black  w-32 shadow-md rounded ${isGalleryOpen ? "block" : "hidden"
                  }`}
              >
                <li>
                  <a href="/images" className="block p-2">
                  {selectedLang === 'en' ? 'Images' : 'इमेजिस'}
                  </a>
                </li>
                <li>
                  <a href="/allpdfgets" className="block p-2">
                  {selectedLang === 'en' ? 'PDF' : 'पीडीएफ'}
                  </a>
                </li>
              </ul>
            </li>
            <li className="p-2" onClick={() => setIsNavOpen(false)}>
              <a href="/contact">{selectedLang === 'en' ? 'Contact Us' : 'हमसे संपर्क करें'}</a>
            </li>
            <li className="p-2">
              <select
                value={selectedLang}
                onChange={handleLanguageChange}
                className="px-2 py-1 border rounded text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </li>
            <li className="p-2">
  <Link
    href="/login"
    className="px-4 py-1 bg-green-700 text-white rounded hover:bg-green-800 text-sm"
  >
    Login
  </Link>
</li>
          </ul>
        </div>
      </div>

    </div>
  )
}
export default navbar;