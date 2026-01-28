"use client";
import React, { use, useEffect, useState } from "react";

const AdminAds: React.FC = () => {
  interface Ad {
    link: string;
    image: any[] | string;
  }

  const [adsData, setAdsData] = useState<{ link: string }>({ link: "" });
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [adsList, setAdsList] = useState<Ad[]>([]); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "image") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (file) {
        setSelectFile(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setAdsData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectFile) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectFile);
    formData.append("link", adsData.link);

    try {
      const res = await fetch("/api/auth/adsadd", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const response = await res.json(); 
        setAdsList((prevList) => [
          ...prevList,
          { link: adsData.link, image: response.image[0].path },
        ]);
        alert("Ad uploaded successfully!");
        setAdsData({ link: "" });
        setSelectFile(null);
        setPreview(null);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };
  let fetchadsall = async()=>{
    let response = await fetch('/api/auth/adsget', {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },
    })
    let data = await response.json();
    console.log('data', data)
    if(response.ok){
        setAdsList(data.alldata)
    }
  }
  useEffect(()=>{
    fetchadsall()
  }, [])
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Ads</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="link"
          value={adsData.link}
          onChange={handleChange}
          placeholder="Enter ad link"
          className="border p-2 w-full"
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-auto mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Ad
        </button>
      </form>

      {adsList.map((data, index) => (
  <div key={index} className="border p-2 rounded shadow">
    {/* <a href={data.link} target="_blank" rel="noopener noreferrer"> */}
      <img
        src={data.image[0].path}
        alt={`Ad ${index}`}
        className="w-48 h-auto"
      />
    {/* </a> */}
    <p className="text-sm text-gray-600 break-all">{data.link}</p>
  </div>
))}

    </div>
  );
};

export default AdminAds;
