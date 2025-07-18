// Component: Gallery
import { useState } from 'react'
import styles from '@/styles/Gallery.module.css'

const images = Array.from({ length: 9 }).map((_, i) =>
  `https://via.placeholder.com/600x400?text=Gallery+${i + 1}`
)

export default function Gallery() {
  const [current, setCurrent] = useState(null)

  const close = () => setCurrent(null)
  const prev = () => setCurrent((current - 1 + images.length) % images.length)
  const next = () => setCurrent((current + 1) % images.length)

  return (
    <section id="галерия" className={styles.gallery}>
      <h2>Галерия</h2>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <img key={i} src={src} onClick={() => setCurrent(i)} alt="galeria" />
        ))}
      </div>
      {current !== null && (
        <div className={styles.lightbox} onClick={close}>
          <button className={styles.prev} onClick={e => {e.stopPropagation();prev()}}>&lt;</button>
          <img src={images[current]} alt="big" />
          <button className={styles.next} onClick={e => {e.stopPropagation();next()}}>&gt;</button>
          <button className={styles.close} onClick={close}>×</button>
        </div>
      )}
    </section>
  )
}
