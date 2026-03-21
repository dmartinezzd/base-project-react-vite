import React, { useState, useEffect } from "react";
import "./Carrusel.scss";
import Modal from "../Modal/Modal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Carrusel({ data }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth <= 768) {
        setCardsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (selectedCard) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [selectedCard]);

  if (!data) return null;

  const { sectionId, title, description, cards } = data;

  const maxIndex = cards.length - cardsPerPage;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const translateX = -(currentIndex * (100 / cardsPerPage));

  return (
    <section id={sectionId} className="carrusel-section">
      <div className="carrusel-header">
        <h2 className="carrusel-title">{title}</h2>
        <p className="carrusel-description">{description}</p>
      </div>

      <div className="carrusel-wrapper">
        <button
          className="carrusel-arrow carrusel-arrow-left"
          onClick={prevSlide}
          aria-label="Anterior"
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>

        <div className="carrusel-track-wrapper">
          <div
            className="carrusel-track"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="carrusel-slide"
                style={{ flex: `0 0 ${100 / cardsPerPage}%` }}
              >
                <div
                  className="carrusel-card"
                  onClick={() => setSelectedCard(card)}
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
                        e.stopPropagation();
                        setSelectedCard(card);
                      }}
                    >
                      Ver más detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carrusel-arrow carrusel-arrow-right"
          onClick={nextSlide}
          aria-label="Siguiente"
          disabled={currentIndex >= maxIndex}
        >
          <FaChevronRight />
        </button>
      </div>

      {selectedCard && (
        <Modal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
    </section>
  );
}