"use client";

// Component: Reviews
import styles from "@/styles/Reviews.module.css";

const data = [
  { text: "Страхотно място за семейна почивка.", name: "Иван", date: "Юли 2025" },
  { text: "Невероятна гледка и уютни стаи.", name: "Мария", date: "Юни 2025" },
  { text: "Ще посетим отново!", name: "Георги", date: "Май 2025" },
];

export default function Reviews() {
  return (
    <section id="ревюта" className={styles.reviews}>
      <h2>Ревюта</h2>
      <div className={styles.grid}>
        {data.map((r, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.stars}>★★★★★</div>
            <p>{r.text}</p>
            <span>
              {r.name}, {r.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
