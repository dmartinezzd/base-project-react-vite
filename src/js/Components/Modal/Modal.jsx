import React from "react";
import "./Modal.scss";

export default function Modal({ card, onClose }) {
  if (!card) return null;

  const { image, title, detail } = card;

  // Cerrar al hacer clic fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  // Prevenir propagación del clic en el contenido del modal
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>

      <div className="modal-content" onClick={handleContentClick}>

        {/* Imagen con bordes redondeados */}
        <div className="modal-image-container">
          <img src={image} alt={title} className="modal-image" />
        </div>

        {/* Botón cerrar (X) - Circular y Rojo */}
        <button className="modal-close-button" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        {/* Contenido */}
        <div className="modal-body">

          {/* Título */}
          <h2 className="modal-title">{detail.title}</h2>

          {/* Descripción */}
          <p className="modal-description">{detail.description}</p>

          {/* Lista de beneficios */}
          {detail.benefits && detail.benefits.length > 0 && (
            <ul className="modal-benefits">
              {detail.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {/* Botón de cerrar */}
          <button className="modal-button" onClick={onClose}>
            {detail.buttonLabel || "Cerrar"}
          </button>

        </div>

      </div>

    </div>
  );
}