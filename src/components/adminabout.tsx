"use client";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

interface Data {
  text: string;
}
let adminabout: React.FC = () => {
  let [formdata, setFormdata] = useState<Data>({
    text: "",
  });

  let handlerchange = (e: string) => {
    setFormdata({
      text: e,
    });
  };

  let submithandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response = await fetch("/api/auth/detailsadd", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      let data = await response.json();
      if (response.ok) {
        setFormdata({ text: data.companydetails.text });
        toast.success("Company details added successfully");
      }
    } catch (error) {
      console.error("error adding details", error);
      toast.error("error adding details");
    }
  };
  let fetchalldetails = async () => {
    try {
      let response = await fetch("/api/auth/detailsget", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log('data',data);
      if (response.ok) {
        setFormdata({
          text: data.Companydetails.text,
        });
      }
    } catch (error) {
      console.error("error fetching details", error);
    }
  };
  useEffect(() => {
    fetchalldetails();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Add Company Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submithandler} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">More About Company</Label>

              <ReactQuill
                theme="snow"
                id="text"
                placeholder="Write something about your company..."
                value={formdata.text}
                onChange={handlerchange}
                className="mt-2"
              />
            </div>

            <div className="text-center">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default adminabout;
