"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-6xl font-bold text-center mb-6">
          HalalStream
        </h1>

        <p className="text-center text-slate-300 mb-10">
          Safe Islamic video streaming experience
        </p>

        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Islamic videos..."
            className="flex-1 rounded-2xl px-5 py-4 text-black"
          />

          <button
            onClick={() =>
              router.push(`/search?q=${encodeURIComponent(query)}`)
            }
            className="bg-emerald-500 px-6 py-4 rounded-2xl text-black font-bold"
          >
            Search
          </button>
        </div>
      </div>
    </main>
  );
}
