"use client";

// Component: Header
import { useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo}>
          Gracia House
        </a>
        <div className={styles.links}>
          <a href="#" onClick={(e) => handleClick(e, "#начало")}>Начало</a>
          <a href="#" onClick={(e) => handleClick(e, "#за-нас")}>За нас</a>
          <a href="#" onClick={(e) => handleClick(e, "#галерия")}>Галерия</a>
          <a href="#" onClick={(e) => handleClick(e, "#ревюта")}>Ревюта</a>
          <a
            href="#"
            className={styles.button}
            onClick={(e) => handleClick(e, "#контакт")}
          >
            Контакт
          </a>
        </div>
      </nav>
    </header>
  );
}
