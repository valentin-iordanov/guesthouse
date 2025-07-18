// Component: Contact
import { useState } from 'react'
import styles from '@/styles/Contact.module.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert('Submitted!')
  }

  return (
    <section id="контакт" className={styles.contact}>
      <div className={styles.formWrap}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="name" placeholder="Име" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
          <textarea name="message" placeholder="Съобщение" value={form.message} onChange={handleChange} />
          <button type="submit">Изпрати</button>
        </form>
      </div>
      <div className={styles.info}>
        <p><a href="tel:+3590000000">+359 000 0000</a></p>
        <p><a href="mailto:info@example.com">info@example.com</a></p>
        <p>Свържете се с нас за повече информация!</p>
      </div>
    </section>
  )
}
