import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        console.error(json);
      }
    } catch (err) {
      setStatus('error');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} required />
      <button type="submit">Send</button>
      {status === 'loading' && <p>Sending...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>Message sent!</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Something went wrong.</p>}
    </form>
  );
}
