import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Form.scss";

export default function Form(props = {}) {
  const { onSubmit, initialValues = {} } = props;

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: initialValues.nombre || '',
    email: initialValues.email || '',
    telefono: initialValues.telefono || '',
    password: initialValues.password || '',
  });

  // Estado de errors
  const [errors, setErrors] = useState({});

  // Estado de campos tocados
  const [touched, setTouched] = useState({});

  // Expresiones regulares
  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^[0-9]{10}$/,
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  };

  // Mensajes de error
  const errorMessages = {
    nombre: 'Solo letras, entre 2 y 50 caracteres',
    email: 'Email inválido (ejemplo: usuario@correo.com)',
    telefono: 'Debe tener 10 dígitos',
    password: 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número',
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar cuando el input pierde el foco (onBlur)
  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Marcar como tocado
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validar el field
    validateField(name, value);
  };

  // Validar un field específico
  const validateField = (field, value) => {
    let error = '';

    if (!value.trim()) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} es requerido`;
    } else if (regex[field] && !regex[field].test(value)) {
      error = errorMessages[field];
    }

    setErrors({
      ...errors,
      [field]: error,
    });
  };

  // Validar todo el formulario
  const validarFormulario = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach((field) => {
      newTouched[field] = true;

      const value = formData[field];

      if (!value.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} es requerido`;
      } else if (regex[field] && !regex[field].test(value)) {
        newErrors[field] = errorMessages[field];
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      console.log('Formulario válido:', formData);
      
      // Llamar callback si existe
      if (onSubmit) {
        onSubmit(formData);
      }
    } else {
      console.log('Formulario con errors');
    }
  };

  // Limpiar formulario
  const cleanForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      password: '',
    });
    setErrors({});
    setTouched({});
  };

  function render() {
    return (
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-card">
            <h2 className="form-title">Registro</h2>

            <form onSubmit={handleSubmit} className="custom-form">
              {/* Nombre */}
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className={classNames('form-input', {
                    'input-error': touched.nombre && errors.nombre,
                    'input-success': touched.nombre && !errors.nombre,
                  })}
                  value={formData.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Juan Pérez"
                />
                {touched.nombre && errors.nombre && (
                  <span className="error-message">{errors.nombre}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={classNames('form-input', {
                    'input-error': touched.email && errors.email,
                    'input-success': touched.email && !errors.email,
                  })}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ejemplo@correo.com"
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className={classNames('form-input', {
                    'input-error': touched.telefono && errors.telefono,
                    'input-success': touched.telefono && !errors.telefono,
                  })}
                  value={formData.telefono}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="5512345678"
                  maxLength="10"
                />
                {touched.telefono && errors.telefono && (
                  <span className="error-message">{errors.telefono}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={classNames('form-input', {
                    'input-error': touched.password && errors.password,
                    'input-success': touched.password && !errors.password,
                  })}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Mínimo 8 caracteres"
                />
                {touched.password && errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              {/* Botones */}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cleanForm}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return render();
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};