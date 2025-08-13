import { useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
// import axios from "axios";

import { Bellafral } from "../components/diaper/bellafral";

// const API_URL = "/api";

// const apiClient = axios.create({
//   withCredentials: true,
// });

export function IndexPage() {
  const [bellafral, setBellafral] = useState(false);
  const [bellafralBasic, setBellafralBasic] = useState(false);
  const [bellafralMille, setBellafralMille] = useState(false);
  const [bigConfort, setBigConfort] = useState(false);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header as="h3" className="text-center">
              Selecione o produto
            </Card.Header>
            <Card.Body>
              <Row className="justify-content-center gy-4">
                <Col md={6} className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    size="lg"
                    onClick={() => {
                      setBellafral(true);

                      setBellafralBasic(false);

                      setBellafralMille(false);

                      setBigConfort(false);
                    }}
                  >
                    Bellafral
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    size="lg"
                    onClick={() => {
                      setBellafral(false);

                      setBellafralBasic(true);

                      setBellafralMille(false);

                      setBigConfort(false);
                    }}
                  >
                    Bellafral Basic
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    size="lg"
                    onClick={() => {
                      setBellafral(false);

                      setBellafralBasic(false);

                      setBellafralMille(true);

                      setBigConfort(false);
                    }}
                  >
                    Bellafral Mille
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    size="lg"
                    onClick={() => {
                      setBellafral(false);

                      setBellafralBasic(false);

                      setBellafralMille(false);

                      setBigConfort(true);
                    }}
                  >
                    Big Confort
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3 mb-5">
        <Col>
          {bellafral && <Bellafral />}
          {bellafralBasic}
          {bellafralMille}
          {bigConfort}
        </Col>
      </Row>
    </Container>
  );
}
