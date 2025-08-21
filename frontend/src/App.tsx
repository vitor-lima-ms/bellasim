import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { IndexPage } from "./pages/IndexPage";
import { ReadSimulationPage } from "./pages/simulations/ReadSimulationPage";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LogoutPage } from "./pages/auth/LogoutPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

import { CreateAndReadConstantParameterPage } from "./pages/constantParameters/CreateAndReadConstantParameterPage";
import { UpdateConstantParameterPage } from "./pages/constantParameters/UpdateConstantParameterPage";

import { CreateAndReadRawMaterialPage } from "./pages/rawMaterial/CreateAndReadRawMaterialPage";
import { UpdateRawMaterialPage } from "./pages/rawMaterial/UpdateRawMaterialPage";

function AppContent() {
  const auth = useAuth();

  const navbarBackgroundColor = "#e67e00";

  return (
    <div className="App">
      {auth.isAuthenticated && (
        <>
          <Navbar
            variant="light"
            className="shadow-sm"
            style={{
              backgroundColor: navbarBackgroundColor,
              fontWeight: "bold",
            }}
          >
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavDropdown title="Simulação de custos">
                    <NavDropdown.Item href="/">Simular</NavDropdown.Item>
                    <NavDropdown.Item href="/read-simulation">
                      Histórico de simulações
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/raw-material">Matérias-primas</Nav.Link>
                  <Nav.Link href="/constant-parameter">
                    Parâmetros constantes
                  </Nav.Link>
                  <Nav.Link href="/register">Registrar</Nav.Link>
                  <Nav.Link href="/logout">Sair</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/read-simulation"
          element={
            <ProtectedRoute>
              <ReadSimulationPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/constant-parameter"
          element={
            <ProtectedRoute>
              <CreateAndReadConstantParameterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:itemType/update-constant-parameter/:id"
          element={
            <ProtectedRoute>
              <UpdateConstantParameterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/raw-material"
          element={
            <ProtectedRoute>
              <CreateAndReadRawMaterialPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-raw-material/:id"
          element={
            <ProtectedRoute>
              <UpdateRawMaterialPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
