import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contact, siteIdentity } from "@/data/portfolio";

export function Contact() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <motion.div
          className="contact-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reducedMotion ? 0 : 0.76,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <p className="section-index">04 / Contact</p>
          <h2 id="contact-heading">{contact.heading}</h2>
          <p>{contact.summary}</p>
        </motion.div>
        <motion.div
          className="contact-links"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0 : 0.72,
            delay: reducedMotion ? 0 : 0.08,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          {contact.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span>{link.label}</span>
              <strong>{link.display}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </section>

      <footer className="site-footer-v2">
        <span>
          {siteIdentity.name} · {siteIdentity.discipline}
        </span>
        <span>{siteIdentity.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
