import React from "react";
import "./Banner.scss";

export default function Banner({ data }) {
  if (!data) return null;

  const {
    sectionId,
    backgroundImage,
    overlay,
    badge,
    title,
    description,
    actions
  } = data;

  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(${overlay.startColor}, ${overlay.endColor}),
      url(${backgroundImage})
    `,
  };

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id={sectionId} className="banner" style={backgroundStyle}>
      <div className="banner-content">

        {badge && (
          <div className="banner-badge">{badge}</div>
        )}

        <h1 className="banner-title">{title}</h1>

        <p className="banner-description">{description}</p>

        {actions && actions.length > 0 && (
          <div className="banner-actions">
            {actions.map((btn) => (
              <button
                key={btn.id}
                className={`banner-btn banner-btn-${btn.variant}`}
                onClick={() => scrollToSection(btn.href)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}