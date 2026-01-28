import Newsbyid from "@/components/NewsById";
import { Suspense } from "react";

export default function newsbyid(){
    return <Suspense fallback={<div className="p-6 text-center text-gray-500">Loading article...</div>}>
     <Newsbyid />
     </Suspense>
}