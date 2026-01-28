"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

let logout: React.FC = () => {
    let router = useRouter();
   let handleSubmit = async() =>{
    try {
    let response = await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let data  = await response.json();
    if(response.ok){
        toast.success('Logout successfully');
        router.push('/login');
    }
    } catch (error) {
        toast.error("Something went wrong during logout"); 
    }
   }
   useEffect(()=>{
    handleSubmit();
   }, [])
  return null;
};

export default logout;
