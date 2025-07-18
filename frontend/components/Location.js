// Component: Location
import styles from '@/styles/Location.module.css'

export default function Location() {
  const openMap = () => {
    window.open('https://maps.google.com/?q=Apriltsi,Bulgaria', '_blank')
  }

  return (
    <section className={styles.location}>
      <h2>Локация</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2907.926995412542!2d24.92300731545017!3d42.819525379159624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDLCsDQ5JzA5LjMiTiAyNMKwNTUnMjAuNCJF!5e0!3m2!1sen!2sbg!4v1715281213123"
        width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <button onClick={openMap}>Отвори в Google Maps</button>
    </section>
  )
}
