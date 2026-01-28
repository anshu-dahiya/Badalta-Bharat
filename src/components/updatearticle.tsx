'use client';

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";



let UpdateArticle: React.FC = ()=>{

  interface Article {
    _id?: string;
    title: string;
    shortDescription: string;
    content: string;
    image: any[] | string;
    category: string;
    status: string;
    createdAt: string;
  }
  let [articledata, setArticleData] = useState<Article[]>([]);
  let [selectchange, setSelectChange] = useState<Article | null>(null);
  let [selectfile, setSelectFile] = useState<File | null>(null);
  let [previmg, setPreviewImg] = useState<string | null>(null);
  let [loading, setLoading] = useState(false);
  
  let fetchnews = async()=>{
  try {
    let response = await fetch('/api/auth/newsget?language=all')
    let data = await response.json();
    console.log('qwe_data',data, articledata)
    if(response.ok){
      setArticleData(data.data);
    }
    } catch (error) {
      console.error('an internal server Error', error);
      toast.error('an internal server Error to fetch news');
      
    }
  }
    useEffect(()=>{
      fetchnews();
    }, [])

    let handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  let { name, value, type } = e.target;
  if (!selectchange) return;

  if (type === 'file') {
    let fileinput = e.target as HTMLInputElement;
    console.log('zxc_file', fileinput);
    let file = fileinput.files?.[0];
    if (file) {
      setSelectFile(file);
      setPreviewImg(URL.createObjectURL(file))
      setSelectChange({ ...selectchange, image: [ { path: URL.createObjectURL(file) } ] })
    } 
  }else {
    setSelectChange({ ...selectchange, [name]: value });
  }
};

const handleChange2 = (value: string) => {
  setSelectChange((prevData:any) => ({
    ...prevData,
    content: value, // Update the content state with the Quill editor value
  }));
};


    let updatefunction = async () => {
      if(!selectchange) {
        console.error('No article selected for update');
        return;
      }
      try {
        let formData = new FormData();
        formData.append('title', selectchange?.title || '');
        formData.append('shortDescription', selectchange?.shortDescription || '');
        formData.append('content', selectchange?.content || '');
        formData.append('category', selectchange?.category || '');
        formData.append('status', selectchange?.status || '');
        if (selectfile) {
          formData.append('image',selectfile);
        }
      let response = await fetch(`/api/auth/newsupdate/${selectchange._id}`, 
        {
          method: 'PATCH',
          body: formData,
        } )
        let data = await response.json();
        if(response.ok){
          toast.success('Article updated successfully');
          setArticleData(data.updatedarticle);
          setPreviewImg(null);
          setSelectChange(null);
          fetchnews();
        }else{
          console.error('Error updating article:', data.error);
          toast.error('Error updating article');
        }
      } catch (error) {
        console.error('an internal server error:', error);  
        toast.error('an internal server error');
      }
    }

    let deletefunction = async (id: string | undefined) => {
      try {
          let resonse = await fetch(`/api/auth/newsdelete/${id}`,
              {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              })
          let data = await resonse.json();
          if (resonse.ok) {
              toast.success('Article deleted successfully');
              fetchnews();
          }
      } catch (error) {
          console.error('an internal server error:', error);
          toast.error('an internal server error');
      }
    }
  return (
    <div>
   {Array.isArray(articledata) && articledata.length > 0 ? (
  articledata.map((article) => (
    <div
      key={article._id}
      className="mb-6 rounded-xl border border-gray-200 p-5 shadow-md bg-white hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col md:flex-row items-start gap-4">
        {article.image && (
          <img
            src={article.image[0].path}
            alt={article.title}
            className="w-32 h-32 object-cover rounded-md border"
          />
        )}
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">{article.title}</h2>
          <p className="text-gray-600">{article.shortDescription}</p>
          <p className="text-sm text-gray-500">{article.content}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-700">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              Category: {article.category}
            </span>
            <span
              className={`px-2 py-1 rounded ${
                article.status === "published"
                  ? "bg-green-200 text-green-900"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              Status: {article.status}
            </span>
          </div>
        </div>
      </div>
            
      {new Date(article.createdAt as string).getTime() ? (
  <p className="text-sm text-gray-400 mt-2">
    🕒 Published on:{" "}
    {new Date(article.createdAt).toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    })}
  </p>
) : (
  <p className="text-sm text-red-400 mt-2">🕒 Invalid publish date</p>
)}

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => {
            setSelectChange(article);
            setPreviewImg(article.image[0].path);
            setSelectFile(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => deletefunction(article._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
        >
          🗑 Delete
        </button>
      </div>

      {selectchange?._id === article._id && (
        <div className="mt-6 space-y-4 bg-gray-50 p-5 rounded-lg border-t">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={selectchange?.title || ""}
            onChange={handlechange}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <label>Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={selectchange?.shortDescription || ""}
            onChange={handlechange}
            placeholder="Short Description"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <label>Content</label>
          <ReactQuill
              theme="snow"
              id="content"
              // name="content"
              placeholder="Write your article content here..."
              value={selectchange!.content}
              onChange={handleChange2}
              className="mt-2"
            />
            <label>Category</label>
          <input
            type="text"
            name="category"
            value={selectchange?.category || ""}
            onChange={handlechange}
            placeholder="Category"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
         
          <div className="flex items-center gap-4">
            <input type="file" name="image" onChange={handlechange} />
            {previmg && (
              <img
                src={previmg}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border"
              />
            )}
          </div>
          <label>Status</label>
          <select
            name="status"
            value={selectchange?.status || ""}
            onChange={handlechange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={() => updatefunction()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow transition"
          >
            {loading ? "Updating..." : "✅ Confirm Update"}
          </button>
        </div>
      )}
    </div>
  ))
) : (
  <div className="text-center py-10 text-gray-500">No articles found</div>
)}

    </div>

  );

}

export default UpdateArticle;

