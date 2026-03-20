import React from "react";
import "./InformationSection.scss";

export default function InformationSection({ data }) {
  if (!data) return null;

  const {
    sectionId,
    image,
    title,
    paragraphs,
    features
  } = data;

  return (
    <section id={sectionId} className="info-section">

      <div className="info-container">

        <div className="info-image">
          <img src={image} alt={title} />
        </div>

        <div className="info-content">

          <h2>{title}</h2>

          {paragraphs?.map((text, index) => (
            <p key={index}>{text}</p>
          ))}

          <div className="info-features">
            {features?.map((item) => (
              <div key={item.id} className="feature-card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}