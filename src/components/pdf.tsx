"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from 'react-photo-view';


let pdf: React.FC = () => {
  interface pdfs {
    _id: string;
    file: string;
    createdAt: string;
  }
  let [previewshow, setPreviewShow] = useState<string | null>(null);
  let [selectfile, setSelectFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<"en" | "hn">("en");
  let [newpdf, setnewpdf] = useState<pdfs[]>([]);

  let handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileinput = e.target as HTMLInputElement;
    let file = fileinput.files?.[0];
    if (file) {
      setSelectFile(file);
      setPreviewShow(URL.createObjectURL(file));
    }
  };

  let handleadd = async () => {
    let formdata = new FormData();
    if (selectfile) {
      formdata.append("file", selectfile);
    }
    // formdata.append("file", selectfile);
    formdata.append("language", language);
    try {
      let response = await fetch("/api/auth/pdfadd", {
        method: "POST",
        body: formdata,
      });
      let data = await response.json();
      if (response.ok) {
        toast.success("pdf added successfully");
        await getpdfhandler();
        setSelectFile(null);
        setPreviewShow(null);
        // setnewpdf((prev) => [...prev, data.newpdf.file]);
        // await getpdfhandler();
      }
    } catch (error) {
      console.error("an internal server Error", error);
      toast.error("an internal server Error");
    }
  };
  let getpdfhandler = async () => {
    try {
      let response = await fetch(`/api/auth/pdfget?language=${language}` );
      let data = await response.json();
      if (response.ok) {
        setnewpdf(data.pdfs);
      }
    } catch (error) {
      console.error("an internal server Error", error);
    }
  };
  useEffect(() => {
    getpdfhandler();
  }, [language]);

  let deletefunction = async (id: string | undefined) => {
    try {
      let response = await fetch(`/api/auth/pdfdelete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.ok) {
        toast.success("pdf deleted successfully");
        setnewpdf([]);
        await getpdfhandler();
      }
    } catch (error) {
      console.error("an internal server Error", error);
    }
  };
  return (
    <div>
      <div className="container mx-auto flex justify-center text-center text-base mt-5">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-2 rounded border ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage("hn")}
          className={`px-4 py-2 rounded border ${language === "hn" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Hindi
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 mb-6">
        <Label htmlFor="picture" className="mr-2">
          Upload File :{" "}
        </Label>
        <Input
          id="picture"
          type="file"
          accept="image/*,.pdf"
          onChange={handlechange}
          className="mt-1 mr-3.5"
        />
        <button
          className="bg-blue-200 hover:bg-blue-400 border-2 rounded-sm w-25  mt-1 text"
          onClick={handleadd}
        >
          submit
        </button>
        </div>
      </div>

      <div className="container mx-auto w-50">
        {previewshow &&
          (previewshow.endsWith(".pdf") ||
          selectfile?.type === "application/pdf" ? (
            <iframe
              src={previewshow}
              className="mt-4 w-full h-96 border rounded"
              title="pdf-preview"
            />
          ) : (
            <img src={previewshow} alt="preview" className="mt-4 rounded-md" />
          ))}
      </div>
      <h3 className="text-center mt-2.5 text-bold">Uploaded Files Here:</h3>
      <div className="grid grid-cols-12 gap-4 mt-6 ">
        {Array.isArray(newpdf) &&
          newpdf.map((pdf, _id) => (
            <div key={_id} className="col-span-12 sm:col-span-6 lg:col-span-4 ">
              <a href={pdf.file} target="_blank" rel="noopener noreferrer">
                <iframe
                  src={pdf.file}
                  className="w-full h-64"
                  title={`pdf-${_id}`}
                />
              </a>
              <p>{new Date(pdf.createdAt).toLocaleString()}</p>
              <button
                className="p-3 rounded-sm flex justify-center items-center mx-auto"
                onClick={() => deletefunction(pdf._id)}
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default pdf;
