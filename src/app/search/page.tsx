"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(q || "")}`
        );
        const data = await response.json();
        if (data.success) {
          setVideos(data.results || []);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (q) fetchVideos();
  }, [q]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel+Decorative:wght@700&family=Lato:wght@300;400;700&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #F0D080;
          --gold-dim: #8B6914;
          --teal: #0D6E6E;
          --teal-light: #1AADA8;
          --deep-navy: #040D1A;
          --navy: #071428;
          --navy-card: #0B1E38;
          --navy-border: #142840;
          --cream: #F5EDD6;
          --text-muted: #8BA0BB;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-root {
          min-height: 100vh;
          background-color: var(--deep-navy);
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(13,110,110,0.25) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(201,168,76,0.12) 0%, transparent 60%);
          font-family: 'Lato', sans-serif;
          color: var(--cream);
          position: relative;
          overflow-x: hidden;
        }

        /* ── Geometric SVG tiling pattern overlay ── */
        .sp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-width='0.35' opacity='0.18'%3E%3Cpolygon points='40,4 76,22 76,58 40,76 4,58 4,22'/%3E%3Cpolygon points='40,16 64,28 64,52 40,64 16,52 16,28'/%3E%3Cline x1='40' y1='4' x2='40' y2='16'/%3E%3Cline x1='76' y1='22' x2='64' y2='28'/%3E%3Cline x1='76' y1='58' x2='64' y2='52'/%3E%3Cline x1='40' y1='76' x2='40' y2='64'/%3E%3Cline x1='4' y1='58' x2='16' y2='52'/%3E%3Cline x1='4' y1='22' x2='16' y2='28'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 80px 80px;
          pointer-events: none;
          z-index: 0;
        }

        .sp-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem 5rem;
        }

        /* ── Header ── */
        .sp-header {
          text-align: center;
          margin-bottom: 3.5rem;
          position: relative;
        }

        .sp-bismillah {
          font-family: 'Amiri', serif;
          font-size: 1.5rem;
          color: var(--gold);
          letter-spacing: 0.15em;
          margin-bottom: 0.6rem;
          opacity: 0.85;
          animation: fadeDown 0.7s ease both;
        }

        .sp-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 700;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dim) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 0.05em;
          line-height: 1.15;
          animation: fadeDown 0.8s 0.1s ease both;
        }

        .sp-query-badge {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.35rem 1.2rem;
          border: 1px solid var(--gold-dim);
          border-radius: 999px;
          font-family: 'Lato', sans-serif;
          font-size: 0.85rem;
          color: var(--gold-light);
          background: rgba(201,168,76,0.07);
          letter-spacing: 0.08em;
          animation: fadeDown 0.9s 0.2s ease both;
        }

        /* ornamental divider */
        .sp-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.8rem auto 0;
          max-width: 420px;
          animation: fadeDown 1s 0.3s ease both;
        }
        .sp-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-dim), transparent);
        }
        .sp-divider-gem {
          width: 10px; height: 10px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(201,168,76,0.6);
        }

        /* ── Loading ── */
        .sp-loading {
          text-align: center;
          padding: 5rem 0;
          animation: fadeIn 0.5s ease;
        }
        .sp-spinner {
          width: 64px; height: 64px;
          margin: 0 auto 1.5rem;
          position: relative;
        }
        .sp-spinner::before,
        .sp-spinner::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .sp-spinner::before {
          border-top-color: var(--gold);
          border-right-color: var(--gold);
          animation: spin 1s linear infinite;
        }
        .sp-spinner::after {
          inset: 10px;
          border-bottom-color: var(--teal-light);
          border-left-color: var(--teal-light);
          animation: spin 0.7s linear infinite reverse;
        }
        .sp-loading p {
          font-family: 'Amiri', serif;
          font-size: 1.1rem;
          color: var(--gold-dim);
          letter-spacing: 0.1em;
        }

        /* ── Empty state ── */
        .sp-empty {
          text-align: center;
          padding: 5rem 0;
          animation: fadeIn 0.5s ease;
        }
        .sp-empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.4;
        }
        .sp-empty p {
          font-family: 'Amiri', serif;
          font-size: 1.15rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        /* ── Grid ── */
        .sp-grid {
          display: grid;
          gap: 1.75rem;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        /* ── Card ── */
        .sp-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: var(--navy-card);
          border: 1px solid var(--navy-border);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          transition: transform 0.32s cubic-bezier(.22,.8,.44,1),
                      box-shadow 0.32s ease,
                      border-color 0.32s ease;
          animation: cardIn 0.5s ease both;
        }

        /* corner ornaments */
        .sp-card::before,
        .sp-card::after {
          content: '';
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--gold-dim);
          border-style: solid;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        .sp-card::before {
          top: 8px; left: 8px;
          border-width: 1px 0 0 1px;
        }
        .sp-card::after {
          bottom: 8px; right: 8px;
          border-width: 0 1px 1px 0;
        }

        .sp-card:hover {
          transform: translateY(-6px);
          border-color: var(--gold-dim);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.55),
            0 0 0 1px rgba(201,168,76,0.2),
            inset 0 0 60px rgba(201,168,76,0.03);
        }
        .sp-card:hover::before,
        .sp-card:hover::after {
          opacity: 1;
        }

        /* thumbnail wrapper with arch shape top */
        .sp-thumb-wrap {
          position: relative;
          overflow: hidden;
          background: var(--navy);
        }
        .sp-thumb-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(to top, var(--navy-card), transparent);
          pointer-events: none;
        }
        .sp-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease, filter 0.45s ease;
          filter: brightness(0.9) saturate(0.85);
        }
        .sp-card:hover .sp-thumb {
          transform: scale(1.06);
          filter: brightness(1) saturate(1);
        }

        /* play button overlay */
        .sp-play {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          width: 48px; height: 48px;
          background: rgba(201,168,76,0.85);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 3;
          box-shadow: 0 0 20px rgba(201,168,76,0.5);
        }
        .sp-play svg { margin-left: 3px; }
        .sp-card:hover .sp-play {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        /* arch decorative strip */
        .sp-arch-strip {
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), var(--teal-light), var(--gold), transparent);
          opacity: 0.6;
        }

        .sp-info {
          padding: 1rem 1.1rem 1.2rem;
        }

        .sp-video-title {
          font-family: 'Amiri', serif;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.45;
          margin-bottom: 0.5rem;
          color: var(--cream);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .sp-card:hover .sp-video-title { color: var(--gold-light); }

        .sp-channel-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .sp-channel-dot {
          width: 5px; height: 5px;
          background: var(--teal-light);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .sp-channel {
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* card stagger delays */
        .sp-card:nth-child(1)  { animation-delay: 0.05s; }
        .sp-card:nth-child(2)  { animation-delay: 0.10s; }
        .sp-card:nth-child(3)  { animation-delay: 0.15s; }
        .sp-card:nth-child(4)  { animation-delay: 0.20s; }
        .sp-card:nth-child(5)  { animation-delay: 0.25s; }
        .sp-card:nth-child(6)  { animation-delay: 0.30s; }
        .sp-card:nth-child(7)  { animation-delay: 0.35s; }
        .sp-card:nth-child(8)  { animation-delay: 0.40s; }
        .sp-card:nth-child(9)  { animation-delay: 0.45s; }

        /* footer ornament */
        .sp-footer-ornament {
          text-align: center;
          margin-top: 4rem;
          opacity: 0.3;
          font-size: 1.4rem;
          letter-spacing: 0.6em;
        }

        /* ── Animations ── */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="sp-root">
        <div className="sp-inner">

          {/* ── Header ── */}
          <header className="sp-header">
            <p className="sp-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h1 className="sp-title">Search Results</h1>
            {q && <span className="sp-query-badge">✦ {q} ✦</span>}
            <div className="sp-divider">
              <span className="sp-divider-line" />
              <span className="sp-divider-gem" />
              <span className="sp-divider-line" />
            </div>
          </header>

          {/* ── States ── */}
          {loading ? (
            <div className="sp-loading">
              <div className="sp-spinner" />
              <p>Seeking knowledge…</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="sp-empty">
              <div className="sp-empty-icon">☽</div>
              <p>No blessed videos were found for this query.</p>
            </div>
          ) : (
            <div className="sp-grid">
              {videos.map((video) => (
                <Link
                  key={video.videoId}
                  href={`/watch/${video.videoId}`}
                  className="sp-card"
                >
                  {/* thumbnail */}
                  <div className="sp-thumb-wrap">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="sp-thumb"
                    />
                    <div className="sp-play">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="#040D1A">
                        <polygon points="4,2 14,8 4,14" />
                      </svg>
                    </div>
                  </div>

                  {/* gold gradient strip */}
                  <div className="sp-arch-strip" />

                  {/* info */}
                  <div className="sp-info">
                    <h2 className="sp-video-title">{video.title}</h2>
                    <div className="sp-channel-row">
                      <span className="sp-channel-dot" />
                      <span className="sp-channel">{video.channelTitle}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Footer ornament ── */}
          <div className="sp-footer-ornament">✦ ✦ ✦</div>
        </div>
      </main>
    </>
  );
}