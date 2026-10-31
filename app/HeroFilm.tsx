"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "./utils";

const film = "/assets/videos/three-flavors-hero.mp4";
const poster = "/assets/videos/three-flavors-poster.jpg";

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const userStarted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;
    let visible = false;

    const syncPlayback = () => {
      const permitted = userStarted.current || (!motion.matches && !connection?.saveData);
      if (!visible || document.hidden || userPaused.current || !permitted) {
        video.pause();
        return;
      }
      // Do not request the film until playback is appropriate.
      if (!video.getAttribute("src")) video.src = asset(film);
      void video.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.15 });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      userStarted.current = true;
      if (!video.getAttribute("src")) video.src = asset(film);
      void video.play().catch(() => setPlaying(false));
    }
  }

  return (
    <div className="hero-film">
      <img
        className="hero-film-poster"
        src={asset(poster)}
        alt="Chocolate Líbana y su empaque, parte de una colección de tres sabores colombianos"
        width={720}
        height={1280}
        fetchPriority="high"
      />
      <video
        ref={videoRef}
        id="brand-introduction"
        className={ready && !failed ? "hero-film-video is-ready" : "hero-film-video"}
        poster={asset(poster)}
        width={720}
        height={1280}
        muted
        playsInline
        loop
        preload="none"
        aria-label="Presentación de los chocolates Líbana: Uchuva, Naranja y Ají. Video sin audio."
        onLoadedData={() => setReady(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false); }}
      />
      <div className="hero-film-toolbar">
        <span>Tres sabores. Una misma intención.</span>
        {!failed && (
          <button
            type="button"
            onClick={togglePlayback}
            aria-controls="brand-introduction"
            aria-label={playing ? "Pausar video de los sabores" : "Reproducir video de los sabores"}
          >
            <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
            {playing ? "Pausar" : "Reproducir"}
          </button>
        )}
      </div>
    </div>
  );
}
