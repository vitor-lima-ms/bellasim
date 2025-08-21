import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  Alert,
  Badge,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";

const API_URL = "/api";

const apiClient = axios.create({
  withCredentials: true,
});

interface ISimulation {
  simulatedDiaper: {
    model: string;
    size: string;
    rawMaterials: string[];
    rawMaterialsWeight: {
      [key: string]: string;
    };
    costPerRawMaterial: {
      [key: string]: string;
    };
    unitCost: string;
    packageQuantity: string;
    packagingCost: string;
    baleBagCost: string;
    diaperPackageCost: string;
    diaperUnitCost: string;
    commissionPercent: string;
    taxPercent: string;
    freightPercent: string;
    contributionMarginPercent: string;
    STPercent: string;
    salePrice: string;
    unitSalePrice: string;
    salePriceWithST: string;
    unitSalePriceWithST: string;
  };
  createdAt: Date;
}

export function ReadSimulationPage() {
  const [simulationsList, setSimulationsList] = useState<ISimulation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/simulation/read`);

        setSimulationsList(response.data.simulations);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    fetchSimulations();
  }, []);

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} className="text-center mb-4">
          <h1>Histórico de Simulações</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={12} lg={8}>
          {error && <Alert variant="danger">{error}</Alert>}
          {simulationsList.length > 0 ? (
            <Accordion>
              {simulationsList.map((simulation, index) => (
                <Accordion.Item eventKey={String(index)} key={index}>
                  <Accordion.Header>
                    <span className="fw-bold me-2">
                      {simulation.simulatedDiaper.model} (
                      {simulation.simulatedDiaper.size})
                    </span>
                    <span className="text-muted">
                      - Simulado em: {String(simulation.createdAt)}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={7}>
                        <h5>Custos e Parâmetros</h5>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <strong>Embalagem:</strong> R${" "}
                            {simulation.simulatedDiaper.packagingCost}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Saco de Fardo:</strong> R${" "}
                            {simulation.simulatedDiaper.baleBagCost}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Comissão:</strong>{" "}
                            {simulation.simulatedDiaper.commissionPercent}%
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Impostos:</strong>{" "}
                            {simulation.simulatedDiaper.taxPercent}%
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Frete:</strong>{" "}
                            {simulation.simulatedDiaper.freightPercent}%
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Margem de Contrib.:</strong>{" "}
                            {
                              simulation.simulatedDiaper
                                .contributionMarginPercent
                            }
                            %
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>ST:</strong>{" "}
                            {simulation.simulatedDiaper.STPercent}%
                          </ListGroup.Item>
                        </ListGroup>
                        <h6 className="mt-3">Custos de Matéria-Prima</h6>
                        <ListGroup
                          variant="flush"
                          className="border rounded"
                          style={{ maxHeight: "150px", overflowY: "auto" }}
                        >
                          {simulation.simulatedDiaper.rawMaterials.map(
                            (name) => (
                              <ListGroup.Item
                                key={name}
                                className="d-flex justify-content-between"
                              >
                                <span>{name}</span>
                                <Badge bg="secondary">
                                  R${" "}
                                  {
                                    simulation.simulatedDiaper
                                      .costPerRawMaterial[name]
                                  }
                                </Badge>
                              </ListGroup.Item>
                            )
                          )}
                        </ListGroup>
                      </Col>
                      <Col md={5} className="mt-3 mt-md-0">
                        <h5>Resultados Finais</h5>
                        <Alert variant="light" className="text-center p-2">
                          <span className="d-block small">
                            Preço de Venda / Pacote
                          </span>
                          <strong className="d-block fs-4">
                            R$ {simulation.simulatedDiaper.salePrice || "0,00"}
                          </strong>
                          <small className="text-muted">
                            R${" "}
                            {simulation.simulatedDiaper.unitSalePrice || "0,00"}{" "}
                            / fralda
                          </small>
                        </Alert>
                        <Alert variant="info" className="text-center p-2">
                          <span className="d-block small">
                            Preço de Venda (com ST)
                          </span>
                          <strong className="d-block fs-4">
                            R${" "}
                            {simulation.simulatedDiaper.salePriceWithST ||
                              "0,00"}
                          </strong>
                          <small className="text-muted">
                            R${" "}
                            {simulation.simulatedDiaper.unitSalePriceWithST ||
                              "0,00"}{" "}
                            / fralda
                          </small>
                        </Alert>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <Alert variant="info" className="text-center">
              Nenhuma simulação encontrada no histórico.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
