
"use client"
import { Dice1 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";



interface Article {
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    image: any[] | string,
    category: string,
    status: string
}

let newsgetall: React.FC = () =>{
    let [articles, setArticles] = useState<Article[]>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 1,
      })
    let [totalPages, setTotalPages] = useState<number>(0)
    let fetchfunction = async()=>{
        let response = await fetch(`/api/auth/newsget?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data =  await response.json();
        console.log('data', data)
        if(response.ok){
            setArticles(data.data)
            setTotalPages(data.totalPages)
        }
    }
    useEffect(()=>{
        fetchfunction();
    }, [pagination])
return(
<>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.isArray(articles) &&articles.map((data) => (
        <div
          key={data._id}
          className="bg-white rounded-xl border shadow p-4 hover:shadow-md transition-all"
        >
          {Array.isArray(data.image) && data.image.length > 0 ? (
            <Image
              src={data.image[0].path}
              alt={data.title}
              width={300}
              height={180}
              className="mx-auto rounded-md object-cover mb-3"
            />
          ) : (
            <div className="w-full h-[180px] bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
            {data.title}
          </h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {data.shortDescription}
          </p>
          <Link
            href={`/newsbyid?id=${data._id}`}
            className="text-blue-600 font-medium hover:underline"
          >
            Read more →
          </Link>
        
        </div>
      ))}
    </div>
        <div className="flex justify-between mt-6">
        <Button
          disabled={pagination.pageIndex === 0}
          onClick={() => setPagination(prev => ({
            ...prev,
            pageIndex: Math.max(prev.pageIndex - 1, 0),
          }))}
        >
          Previous
        </Button>
        <span>
          Page {pagination.pageIndex + 1} of {totalPages}
        </span>
        <Button  disabled={pagination.pageIndex + 1 >= totalPages}
          onClick={() => setPagination(prev => ({
            ...prev,
            pageIndex: prev.pageIndex + 1,
          }))}
        >
          Next
        </Button>
      </div>
    
      </>
)
}

export default newsgetall