import Image from "next/image";
import React, { useState } from "react";
import { assets } from "../Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, logout } = useAuth();

const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  setIsSubmitting(true);
  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await axios.post("/api/blog/email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Subscription failed");
    }
  } catch (error) {
    toast.error(error.response?.data?.msg || "Subscription failed");
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <header className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src={assets.logo}
            width={180}
            height={40}
            alt="Website Logo"
            className="w-[130px] sm:w-auto"
            priority
          />
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm font-medium hover:text-blue-600"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-4 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-4 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Get Started{" "}
            <Image src={assets.arrow} alt="" width={12} height={12} />
          </Link>
        )}
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] mx-auto text-xs sm:text-base text-gray-600">
          Discover the latest articles and stay updated with our content
        </p>
        <div className="mt-6 flex max-w-[500px] mx-auto scale-75 sm:scale-100 border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <input
            type="email"
            placeholder="Subscribe with your email"
            className="pl-4 py-3 flex-1 outline-none border-none text-sm sm:text-base"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            onClick={onSubmitHandler}
            className="py-3 px-4 sm:px-8 bg-white hover:bg-gray-100 border-l border-gray-300 cursor-pointer transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {!user && (
          <form
            onSubmit={onSubmitHandler}
            className="flex max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-gray-300 rounded-xl overflow-hidden shadow-sm"
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              className="pl-4 py-3 flex-1 outline-none border-none text-sm sm:text-base"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="py-3 px-4 sm:px-8 bg-white hover:bg-gray-100 border-l border-gray-300 cursor-pointer transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
