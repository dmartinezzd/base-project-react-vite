import React, { } from "react";
import "./Pricing.scss";
import NavBar from "../../Components/Navs/NavBar";
import PropTypes from "prop-types";

//init props
Pricing.propTypes = {};

export default function Pricing(props = {}) {
  function render() {
    return (
      <div className="mainWrapper">
        <NavBar />
        <div>Hola Pricing</div>
      </div>
    );
  }

  return render();
}