'use client';
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Categories from "./Components/Categories";
import BlogList from "./Components/BlogList";
import Footer from "./Components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <BlogList />
      <Footer />
    </>
  );
}