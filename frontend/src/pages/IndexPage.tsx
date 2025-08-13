import { Container, Card, Row, Col, Button } from "react-bootstrap";

export function IndexPage() {
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
                  <Button className="btn-custom-orange" size="lg">
                    Bellafral
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button className="btn-custom-orange" size="lg">
                    Bellafral Basic
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button className="btn-custom-orange" size="lg">
                    Bellafral Mille
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button className="btn-custom-orange" size="lg">
                    Big Confort
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
