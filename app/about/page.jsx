'use client';

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-24 px-4 text-center">
        
        {/* Glow effect */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl rounded-full"></div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Insight Chronicle
        </h1>

        <p className="relative text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Where ideas meet perspective — delivering stories that inform, inspire, and challenge thinking.
        </p>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition shadow-lg"
          >
            Explore Articles →
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Our Mission
        </h2>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          At Insight Chronicle, we aim to bring diverse perspectives from across the world.
          From politics to lifestyle, wellness to culture — we create meaningful content
          that sparks curiosity and encourages thoughtful conversations.
        </p>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          What We Cover
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Politics", desc: "Insights on global and local affairs", icon: "🏛️" },
            { title: "Lifestyle", desc: "Trends shaping modern living", icon: "🌿" },
            { title: "Wellness", desc: "Health, mindset & well-being", icon: "🧘" },
            { title: "Culture", desc: "Stories of society & traditions", icon: "🎭" }
          ].map((item, index) => (
            <div 
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-indigo-600">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Quality Content",
                icon: "📖",
                desc: "Well-researched and thoughtfully written articles."
              },
              {
                title: "Diverse Perspectives",
                icon: "🌍",
                desc: "Voices and viewpoints from different backgrounds."
              },
              {
                title: "Meaningful Insights",
                icon: "💡",
                desc: "Content that informs and inspires action."
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl hover:bg-gray-50 transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Exploring Today
        </h2>

        <p className="text-white/80 mb-8">
          Discover articles that inspire, inform, and challenge your perspective.
        </p>

        <Link
          href="/blog"
          className="inline-block px-10 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-200 transition shadow-lg"
        >
          Browse Articles →
        </Link>
      </section>

    </div>
  );
}