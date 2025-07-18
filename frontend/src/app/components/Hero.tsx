"use client";

// Component: Hero
import { useEffect, useState } from "react";
import styles from "@/styles/Hero.module.css";

const images = [
  "https://via.placeholder.com/1200x800?text=Hero+1",
  "https://via.placeholder.com/1200x800?text=Hero+2",
  "https://via.placeholder.com/1200x800?text=Hero+3",
  "https://via.placeholder.com/1200x800?text=Hero+4",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleScroll = () => {
    document.querySelector("#за-нас")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="начало"
      className={styles.hero}
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className={styles.overlay}>
        <h1>Gracia House</h1>
        <h2>Вашият уют в сърцето на природата</h2>
        <button onClick={handleScroll}>Научи повече</button>
      </div>
    </section>
  );
}
