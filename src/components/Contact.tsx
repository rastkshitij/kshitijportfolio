import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, message } = formData;

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=rastkshitij@gmail.com&su=${subject}&body=${body}`;

  window.open(mailtoLink, "_blank");
};

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">Get In Touch</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="glass p-10 rounded-[3rem] border border-border bg-card/80 shadow-2xl">
              <h3 className="text-3xl font-black mb-8 text-foreground">Let's build something amazing together</h3>
              <p className="text-foreground mb-12 text-lg font-medium leading-relaxed opacity-80">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg font-bold text-foreground">Shahjahanpur, Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                    <p className="text-lg font-bold text-foreground">rastkshitij@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-xs font-black mb-6 text-muted-foreground uppercase tracking-widest">Social Links</h4>
                <div className="flex gap-4">
                  {[
                    { icon: <Github size={24} />, href: 'https://github.com/rastkshitij' },
                    { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/kshitij-rastogi-4648a6295/' },
                    { icon: <Instagram size={24} />, href: 'https://www.instagram.com/rastogi_kshitij_?igsh=MXY5azhlc2E3bTR2MA%3D%3D&utm_source=qr' }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border shadow-lg"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass p-10 rounded-[3rem] border border-border bg-card/80 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-4">Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-8 py-4 bg-muted border border-border rounded-2xl focus:outline-none focus:border-primary transition-all text-foreground font-bold"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-4">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-8 py-4 bg-muted border border-border rounded-2xl focus:outline-none focus:border-primary transition-all text-foreground font-bold"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-4">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-8 py-4 bg-muted border border-border rounded-2xl focus:outline-none focus:border-primary transition-all text-foreground font-bold resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <motion.button 
                type="submit" 
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : (
                  <>
                    Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
              
              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center text-sm font-black uppercase tracking-widest"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 dark:text-red-400 text-center text-sm font-black uppercase tracking-widest"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
