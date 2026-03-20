import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.scss";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setNavBarSuccess } from "../../Redux/Reducers/navBar";
import { getNavBarData } from "../../Redux/Selectors/navBar";
import { logout } from "../../Redux/Reducers/login";

// logics
import { navBarLogics } from "../../Logics/navBar";

// routes
import { routeCodes } from "../../Routes/routesConfig";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navBarData = useSelector(getNavBarData);

  useEffect(() => {
    if (!navBarData) {
      navBarLogics({ successCallback, errorCallback });
    }
  }, []);

  function successCallback(data) {
    dispatch(setNavBarSuccess(data));
  }

  function errorCallback() {}

  const scrollToSection = (href) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAction = (action) => {
    if (action === "logout") {
      dispatch(logout());
      navigate(routeCodes.SIGNIN);
    }
  };

  function render() {
    if (!navBarData) return null;

    const { brand, navigation, actions } = navBarData.data;

    return (
      <Navbar expand="lg">
        <Container>

          {/* Brand */}
          <Navbar.Brand>
            <div className="brand-container">
              <div className="logo">
                {brand.logoText}
              </div>
              <div className="brand-name">{brand.name}</div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            
            {/* Navigation Links (Centro) */}
            <Nav className="justify-content-center flex-grow-1">
              {navigation
                ?.filter((item) => item.visible)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <Nav.Link
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
            </Nav>

            {/* Botón Cerrar Sesión (Derecha) */}
            <div className="d-flex">
              {actions
                ?.filter((item) => item.visible)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAction(item.action)}
                    className="logout-button"
                  >
                    {item.label}
                  </button>
                ))}
            </div>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    );
  }

  return render();
}