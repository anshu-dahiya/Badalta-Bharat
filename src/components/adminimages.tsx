"use client";
import { useEffect, useState } from "react";
import { Eraser } from "lucide-react";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from "next/image";
interface Data {
  _id: string;
  image: string;
}

let adminpages: React.FC = () => {
  let [image, setimage] = useState<Data[]>([]);
  let getallimages = async () => {
    try {
      let response = await fetch("/api/auth/newsget?language=all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      let data = await response.json();
      console.log('data ', data)
      if (response.ok) {
        setimage(data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  useEffect(() => {
    getallimages();
  }, []);
  let deletefunction = async (id: string | undefined) => {
    try {
      let response = await fetch(`/api/auth/newsdelete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.ok) {
        getallimages();
        toast.success("Image deleted successfully");
      }
    } catch (error) {
      console.error("an internal server Error", error);
      toast.error("an internal server Error");
    }
  };
  return (
    <div>
       <PhotoProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array.isArray(image) &&
          image.map((img:any, _id) => (
            <div
              key={_id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
            >
              <PhotoView key={_id} src={img.image[0].path}>
              <Image
                src={img.image[0].path}
                alt={`News ${_id}`}
                width={500}
                height={500}
                className="w-40 h-40 object-cover rounded-lg cursor-pointer"
              />
              </PhotoView>
              <p>{new Date(img.createdAt).toLocaleString()}</p>
              <button
                onClick={() => deletefunction(img._id)}
                className="mt-4 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-transform hover:scale-125 duration-200 cursor-pointer"
              >
                <Eraser className="w-5 h-5 text-red-600" />
              </button>
            </div>
          ))}
      </div>
      </PhotoProvider>
    </div>
  );
};
export default adminpages;
