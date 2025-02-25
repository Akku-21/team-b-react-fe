import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import CustomerTable from "./components/CustomerTable";
import CustomerDataPage from "./pages/CustomerDataPage";
import PublicCustomerPage from "./pages/PublicCustomerPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/public/customer/:customerId/:accessToken" 
                element={<PublicCustomerPage />} 
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CustomerTable />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kunden"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CustomerTable />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kundedaten/:customerId"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CustomerDataPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              {/* Add placeholder routes for other navigation items */}
              <Route
                path="/statistiken"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <h1>Statistiken (Coming Soon)</h1>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/einstellungen"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <h1>Einstellungen (Coming Soon)</h1>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
