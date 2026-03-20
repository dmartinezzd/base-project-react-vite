import React, { useState, useEffect } from "react";
import "./Carrusel.scss";
import Modal from "../Modal/Modal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carrusel({ data }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data) return null;

  const { sectionId, title, description, cards } = data;

  // Determinar cards por página según el ancho de pantalla
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1); // Móvil: 1 card
      } else if (window.innerWidth <= 1024) {
        setCardsPerPage(2); // Tablet: 2 cards
      } else {
        setCardsPerPage(3); // Desktop: 3 cards
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  // Bloquear/desbloquear scroll del body cuando modal abre
  useEffect(() => {
    if (selectedCard) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedCard]);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleCards = cards.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage
  );

  return (
    <section id={sectionId} className="carrusel-section">

      <div className="carrusel-header">
        <h2 className="carrusel-title">{title}</h2>
        <p className="carrusel-description">{description}</p>
      </div>

      <div className="carrusel-wrapper">
        
        {/* Flecha Izquierda */}
        <button 
          className="carrusel-arrow carrusel-arrow-left" 
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <FaChevronLeft />
        </button>

        {/* Cards Container */}
        <div className="carrusel-container">
          {visibleCards.map((card) => (
            <div 
              key={card.id} 
              className="carrusel-card"
              onClick={() => openModal(card)}
            >

              <div className="card-image">
                <img src={card.image} alt={card.title} />
              </div>

              <div className="card-content">
                <span className="card-tag">{card.tag}</span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.shortText}</p>

                <button 
                  className="card-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evitar doble click
                    openModal(card);
                  }}
                >
                  Ver más detalles
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Flecha Derecha */}
        <button 
          className="carrusel-arrow carrusel-arrow-right" 
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <FaChevronRight />
        </button>

      </div>

      {/* Modal */}
      {selectedCard && (
        <Modal
          card={selectedCard}
          onClose={closeModal}
        />
      )}

    </section>
  );
}