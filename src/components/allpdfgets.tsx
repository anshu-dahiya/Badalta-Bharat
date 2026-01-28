;'use client';
import { useEffect, useState } from "react"
import { toast } from "react-toastify";



let allpdf: React.FC =()=>{
    interface Data{
        _id: string,
        file: string
    }

    let [newpdf, setNewPdf] = useState<Data[]>([]);
    let fetchallpdf = async ()=>{
        try {
        let response = await fetch('/api/auth/pdfget');
        let data = await response.json();
        if(response.ok){
            setNewPdf(data.pdfs);
        }
        } catch (error) {
            console.error('error fetching pdf', error);
            toast.error('error fetching pdf');
        }
    }
    useEffect(()=>{
        fetchallpdf();
    }, [])
    return (
    <div>
            <h3 className="text-center font-serif text-5xl mt-14">E-paper Section Here : </h3>
            <div className="grid grid-cols-12 gap-4">
              {
                newpdf.map((item, _id)=>(
                      <div key={item._id}  className="lg:col-span-4 md:col-span-6 col-span-12 border-2 bg-gray-300  mt-14">
                      <iframe src={item.file} width={300} height={300} className="w-full h-80">
                      </iframe>
                      </div>
                ))
              }
                </div>
        </div>
    )
}

export default allpdf