import React, { Component } from "react";
import "./Catalog.scss";
import NavBar from "../../Components/Navs/NavBar";
import PropTypes from "prop-types";

//init props
Catalog.propTypes = {};

export default function Catalog(props = {}) {
  function render() {
    return (
      <div className="mainWrapper">
        <NavBar />
        <div>Hola Catalog</div>
      </div>
    );
  }

  return render();
}
