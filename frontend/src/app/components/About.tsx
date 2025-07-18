"use client";

// Component: About
import styles from "@/styles/About.module.css";

type Amenity = {
  icon: string;
  label: string;
};

const amenities: Amenity[] = [
  { icon: "fa-bed", label: "Комфортни стаи" },
  { icon: "fa-wifi", label: "Wi-Fi" },
  { icon: "fa-utensils", label: "Кухня" },
  { icon: "fa-tree", label: "Градина" },
  { icon: "fa-car", label: "Паркинг" },
  { icon: "fa-swimming-pool", label: "Басейн" },
  { icon: "fa-fire", label: "Барбекю" },
  { icon: "fa-child", label: "Детски кът" },
  { icon: "fa-dog", label: "Домашни любимци" },
];

export default function About() {
  return (
    <section id="за-нас" className={styles.about}>
      <h2>За нас</h2>
      <p>Предлагаме две уютни къщи сред величествената природа на Априлци.</p>
      <div className={styles.grid}>
        {amenities.map(({ icon, label }) => (
          <div key={label} className={styles.item}>
            <i className={`fa-solid ${icon}`}></i>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
