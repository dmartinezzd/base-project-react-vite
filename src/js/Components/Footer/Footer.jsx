import React from "react";
import "./Footer.scss";

export default function Footer({ data }) {
  if (!data) return null;

  const {
    brand,
    socialLinks,
    contactInfo,
    quickLinks,
    partnerLogos,
    copyright
  } = data;

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h3>{brand.title}</h3>
          <p>{brand.description}</p>

          <div className="socials">
            {socialLinks?.map((item) => (
              <div key={item.id} className="social-icon">
                {item.name[0]}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>{contactInfo.title}</h4>
          {contactInfo.items?.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>

        <div className="footer-col">
          <h4>{quickLinks.title}</h4>
          {quickLinks.items?.map((link, index) => (
            <p
              key={index}
              className="link"
              onClick={() => scrollToSection(link.href)}
            >
              {link.label}
            </p>
          ))}
        </div>

        <div className="footer-col">
          <h4>{partnerLogos.title}</h4>

          <div className="partners">
            {partnerLogos.items?.map((item) => (
              <div key={item.id} className="partner">
                {item.label}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>{copyright}</p>
      </div>

    </footer>
  );
}