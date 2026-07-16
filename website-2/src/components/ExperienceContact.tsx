import { ArrowUpRight } from "lucide-react";
import { contact, experience, siteIdentity } from "@/data/portfolio";

export function ExperienceContact() {
  return (
    <>
      <section className="experience-section" aria-labelledby="experience-heading">
        <header id="experience">
          <p className="section-index">03 / Experience</p>
          <h2 id="experience-heading">Hardware exposure</h2>
        </header>
        <article>
          <div className="experience-meta">
            <strong>{experience.company}</strong>
            <span>{experience.location}</span>
            <span>{experience.timeframe}</span>
          </div>
          <div>
            <h3>{experience.role}</h3>
            <p>{experience.summary}</p>
          </div>
        </article>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="contact-intro">
          <p className="section-index">04 / Contact</p>
          <h2 id="contact-heading">{contact.heading}</h2>
          <p>{contact.summary}</p>
        </div>
        <div className="contact-links">
          {contact.links.map((link) => (
            <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
              <span>{link.label}</span>
              <strong>{link.display}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer-v2">
        <span>{siteIdentity.name} · {siteIdentity.discipline}</span>
        <span>{siteIdentity.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
