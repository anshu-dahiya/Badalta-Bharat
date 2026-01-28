"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from "next/image";



interface Data {
  _id: string;
  image: string;
  createdAt: string;
}
let images: React.FC = () => {
  let [imageshow, setImageShow] = useState<Data[]>([]);
  let fetchallimages = async () => {
    try {
      let response = await fetch("/api/auth/newsget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('response', response)
      let data = await response.json();
      console.log('data ', data)
      if (response.ok) {
        setImageShow(data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Error fetching news");
    }
  };
  useEffect(() => {
    fetchallimages();
  }, []);
  return (
    <div>
        <PhotoProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array.isArray(imageshow) &&
          imageshow.map((img: any, _id) => (
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
              <div>
              <p className="text-sm text-gray-400 mt-2"> Published on: {" "} {new Date(img.createdAt).toLocaleString("en-IN", {
                dateStyle: "full",
                timeStyle: "short",
              })}</p>
            </div>
            </div>
           
          ))}
      </div>
      </PhotoProvider>
    </div>
  );
};
export default images;
