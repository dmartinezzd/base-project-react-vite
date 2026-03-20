import React, { } from "react";
//react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AnimatedProgressBar() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={6}>
          Loading...
          <ProgressBar animated now={100} />
        </Col>
      </Row>
    </Container>
  );
}

export default AnimatedProgressBar;