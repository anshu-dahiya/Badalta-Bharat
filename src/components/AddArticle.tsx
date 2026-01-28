"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageIcon, FileText, Heading1, Tags, Type } from 'lucide-react'
import { motion } from "framer-motion";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import dynamic from "next/dynamic";
// Inside your component

// Your component
let AddArticle: React.FC = () => {
  let [articledata, setArticleData] = useState<{
    title: string;
    shortDescription: string;
    content: string;
    image: File | null;
    category: string;
    status: string;
    language: string;
  }>({
    title: "",
    shortDescription: "",
    content: "",
    image: null,
    category: "",
    status: "",
    language:'en'
  });

  let [previewimg, setPreviewImg] = useState<string | null>(null);
  let [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [value, setValue] = useState<''>('');

  const handleChange2 = (value: string) => {
    setArticleData((prevData) => ({
      ...prevData,
      content: value, // Update the content state with the Quill editor value
    }));
  };

  let handlechange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let { name, type } = event.target;

    if (type === "file") {
      let fileinput = event.target as HTMLInputElement;
      let file = fileinput.files?.[0];

      if (file) {
        setArticleData((prevdata) => ({
          ...prevdata,
          image: file,
        }));
        setPreviewImg(URL.createObjectURL(file));
      }
    } else {
      setArticleData((prevdata) => ({
        ...prevdata,
        [name]: (event.target as HTMLInputElement).value,
      }));
    }
  };


  const handlesubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title,
      shortDescription,
      content,
      category,
      status,
      image, language
    } = articledata;

    if (!title || !shortDescription || !content || !category || !status || !image || !language) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("image", image);
      formData.append("language", language);

      const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/auth/newsadd`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Article added successfully");
        setArticleData({
          title: "",
          shortDescription: "",
          content: "",
          image: null,
          category: "",
          status: "",
          language:'en'
        });
        setPreviewImg(null);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      toast.error("An error occurred while submitting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">📝 Submit New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlesubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="flex items-center gap-2 font-semibold">
                <Heading1 size={16} /> Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the article title"
                value={articledata.title}
                onChange={handlechange}
                className="mt-2"
              />
            </div>

            {/* Short Description */}
            <div>
              <Label htmlFor="shortDescription" className="flex items-center gap-2 font-semibold">
                <FileText size={16} /> Short Description
              </Label>
              <Input
                id="shortDescription"
                name="shortDescription"
                placeholder="Brief description about the article"
                value={articledata.shortDescription}
                onChange={handlechange}
                className="mt-2"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content" className="flex items-center gap-2 font-semibold">
                <Type size={16} /> Content
              </Label>
              <ReactQuill
                theme="snow"
                id="content"
                // name="content"
                placeholder="Write your article content here..."
                value={articledata.content}
                onChange={handleChange2}
                className="mt-2"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image" className="flex items-center gap-2 font-semibold">
                <ImageIcon size={16} /> Upload Image
              </Label>
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handlechange}
                className="file:cursor-pointer mt-2"
              />
              {previewimg && (
                <img
                  src={previewimg}
                  alt="Preview"
                  className="w-40 h-auto mt-3 rounded-lg border shadow-md"
                />
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="flex items-center gap-2 font-semibold">
                <Tags size={16} /> Category
              </Label>
              <Input
                id="category"
                name="category"
                placeholder="Eg. Technology, Sports..."
                value={articledata.category}
                onChange={handlechange}
                className="mt-2"
              />
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status" className="font-semibold">Status</Label>
              <Select value={articledata.status} onValueChange={(value) => setArticleData({ ...articledata, status: value })} >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select article status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published" >Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Language */}
            <div>
              <Label htmlFor="language" className="font-semibold">Language</Label>
              <Select
                value={(articledata as any).language || ""}
                onValueChange={(value) => setArticleData({ ...articledata, language: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hn">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Submit */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-90 text-white" >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>

  )
}
export default AddArticle;
