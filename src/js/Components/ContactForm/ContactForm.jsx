import React, { useState } from "react";
import "./ContactForm.scss";

export default function ContactForm({ data }) {
  if (!data) return null;

  const { infoCard, formCard } = data;

  // 🔹 estados
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // 🔹 regex
  const regex = {
    firstName: /^[a-zA-Z\s]{1,25}$/,
    lastName: /^[a-zA-Z\s]{1,25}$/,
    phone: /^\+\d{3} \d{4}-\d{4}$/,
    country: /^[a-zA-Z\s]{1,20}$/,
    address: /^[a-zA-Z0-9\s#-]{8,100}$/,
  };

  // 🔹 handlers
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    const field = formCard.fields.find(f => f.name === name);

    if (field?.required && !value) {
      error = "Este campo es obligatorio.";
    } else if (regex[name] && value && !regex[name].test(value)) {
      error = field?.validation?.message || "Formato inválido";
    }

    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    formCard.fields.forEach(field => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = "Este campo es obligatorio.";
      } else if (regex[field.name] && value && !regex[field.name].test(value)) {
        newErrors[field.name] = field.validation?.message;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
    }
  };

  // 🔹 botón habilitado
  const isValid =
    formCard.fields
      .filter(f => f.required)
      .every(f => formData[f.name]) &&
    Object.values(errors).every(e => !e);

  return (
    <section id={data.sectionId} className="contact">

      <div className="contact-container">

        {/* 🔹 LEFT */}
        <div className="contact-info">
          <h2>{infoCard.title}</h2>
          <p>{infoCard.description}</p>

          {infoCard.contactData.map((item, i) => (
            <p key={i}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}

          <div className="highlight">
            <strong>{infoCard.highlight.title}</strong>
            <p>{infoCard.highlight.text}</p>
          </div>
        </div>

        {/* 🔹 RIGHT */}
        <div className="contact-form">

          <h2>{formCard.title}</h2>

          <form onSubmit={handleSubmit}>

            <div className="grid">

              {formCard.fields.map((field) => {
                const isTextarea = field.type === "textarea";

                return (
                  <div
                    key={field.id}
                    className={`form-group ${
                      field.name === "address" || field.name === "message"
                        ? "full"
                        : ""
                    }`}
                  >
                    <label>{field.label}</label>

                    {isTextarea ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          touched[field.name] && errors[field.name]
                            ? "error"
                            : ""
                        }
                      />
                    )}

                    {touched[field.name] && errors[field.name] && (
                      <span className="error-text">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                );
              })}

            </div>

            <button type="submit" disabled={!isValid}>
              {formCard.submitButton.label}
            </button>

          </form>
        {submitted && (
            <div className="success-box">
                {formCard.successMessage}
            </div>
        )}
        </div>

      </div>
    </section>
  );
}