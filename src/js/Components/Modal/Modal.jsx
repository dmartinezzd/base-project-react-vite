import React from "react";
import "./Modal.scss";

export default function Modal({ card, onClose }) {
  if (!card) return null;

  const { image, title, detail } = card;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="modal-image-container">
          <img src={image} alt={title} className="modal-image" />
        </div>

        <div className="modal-body">
          <div className="modal-title-row">
            <h2 className="modal-title">{detail.title}</h2>
            <button className="modal-close-button" onClick={onClose} aria-label="Cerrar">
              ×
            </button>
          </div>

          <p className="modal-description">{detail.description}</p>

          {detail.benefits && detail.benefits.length > 0 && (
            <ul className="modal-benefits">
              {detail.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          <button className="modal-button" onClick={onClose}>
            {detail.buttonLabel || "Cerrar"}
          </button>
        </div>

      </div>
    </div>
  );
}