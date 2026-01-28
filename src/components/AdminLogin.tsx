"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminLogin: React.FC = () => {
  const [useremail, setUseremail] = useState<string>("");
  const [userpassword, setUserpassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useremail, userpassword }),
      });
      setLoading(true);
      const data = await response.json();
      // setLoading(true);
      if (!response.ok) {
        setLoading(false);
        toast.error("Login failed");
      }
      // setLoading(true);
      router.push("/admin"); 
      toast.success("Login successfully ");
    } catch (err: any) {
      setError(err.message);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-indigo-500">
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 p-8 rounded-lg shadow-xl w-96">
        <div className="relative z-10">
          <h2 className="text-white text-3xl font-bold text-center mb-6">Login</h2>

          {/* 🔹 Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
                className="w-full p-3 pl-10 border-b-2 border-gray-300 bg-transparent text-white focus:outline-none focus:border-white"
                placeholder="User Email"
                required
              />
              <i className="absolute left-3 top-3 text-white fa fa-user"></i>
            </div>
            <div className="relative">
              <input
                type="password"
                value={userpassword}
                onChange={(e) => setUserpassword(e.target.value)}
                className="w-full p-3 pl-10 border-b-2 border-gray-300 bg-transparent text-white focus:outline-none focus:border-white"
                placeholder="Password"
                required
              />
              <i className="absolute left-3 top-3 text-white fa fa-lock"></i>
            </div>
            {loading ? (
              <div>Loading...</div>
            ): (

            <button type="submit" className="w-full bg-white text-indigo-600 py-2 rounded-lg font-bold hover:bg-gray-200" >
              Log In Now
            </button>
            )}
          </form>

          <div className="text-center mt-6 text-white">
            <h3>Log in via</h3>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="text-white text-2xl hover:scale-125 transform transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white text-2xl hover:scale-125 transform transition">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white text-2xl hover:scale-125 transform transition">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
