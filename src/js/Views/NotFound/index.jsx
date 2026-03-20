import React, { } from "react";
import "./NotFound.scss";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { routeCodes } from "../../Routes/routesConfig";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import blocked from "../../../assets/construccion.png";

NotFound.propTypes = {};

export default function NotFound(props = {}) {
  function render() {
    const navigate = useNavigate();

    return (
      <div className={"not-found-wrapper"}>
        <Image src={blocked} fluid className={"imgNotFoun"} />
        <h1 style={{ fontSize: "6rem" }}>404</h1>
        <Button
          variant="outline-dark"
          onClick={() => navigate(routeCodes.HOMEPAGE)}>
          Esta pagina no existe, vamos a casa.
        </Button>
      </div>
    );
  }

  return render();
}
