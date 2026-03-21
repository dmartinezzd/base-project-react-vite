import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess, setLoginError } from "../../Redux/Reducers/login";
import { getLoginData, getLoginDataError } from "../../Redux/Selectors/login";

//Logics
import { loginLogics } from "../../Logics/login";

//Routes
import { routeCodes } from "../../Routes/routesConfig";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginDataSuccess = useSelector(getLoginData);
  const loginDataError = useSelector(getLoginDataError);

  const [loader, setLoader] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d*%\-#$]{8,}$/,
  };

  useEffect(() => {
    if (!loginDataSuccess) {
      loginLogics({
        successCallback,
        errorCallback,
      });
    } else {
      setLoader(false);
    }
  }, []);

  function successCallback(data) {
    dispatch(setLoginSuccess(data));
    setLoader(false);
  }

  function errorCallback(error) {
    dispatch(setLoginError(error));
    setLoader(false);
  }

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

  const validateField = (field, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Este campo es requerido";
    } else if (regex[field] && !regex[field].test(value)) {
      if (field === "email") {
        error = "Formato inválido (ej: lifemiles@avianca.com)";
      }

      if (field === "password") {
        error =
          "Mínimo 8 caracteres, 1 mayúscula, 1 número y solo (* % - $ #)";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      navigate(routeCodes.HOMEPAGE);
    }
  };

  const isFormValid =
    regex.email.test(formData.email) &&
    regex.password.test(formData.password);

  const loginData = loginDataSuccess?.data;

  function render() {
    if (loader) {
      return (
        <div className="login-container">
          <div>Cargando...</div>
        </div>
      );
    }

  if (!loginData) {
    return (
      <div className="login-container">
        <div>{loginDataError?.error || "Error cargando login"}</div>
      </div>
    );
  }

    return (
      <div className="login-container">
        <div className="login-card">
          
          <div className="login-header">
            <div className="logo-container">
              <div className="logo">
                {loginData.brand.logoText}
              </div>
              <div className="brand-info">
                <h2 className="brand-name">{loginData.brand.title}</h2>
                <p className="brand-subtitle">{loginData.brand.subtitle}</p>
              </div>
            </div>

            <h1 className="login-title">{loginData.content.title}</h1>
            <p className="login-description">{loginData.content.description}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {loginData.form.fields.map((field) => (
              <div key={field.id} className="form-group">
                <label>{field.label}</label>

                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched[field.name] && errors[field.name] ? "error" : ""}
                />

                {touched[field.name] && errors[field.name] && (
                  <span className="error-message">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}

            <button 
              type="submit" 
              className="submit-button"
              disabled={!isFormValid}
            >
              {loginData.form.submitButton.label}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return render();
}