import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./theme";
import CustomerTable from "./components/CustomerTable";
import CustomerDataPage from "./pages/CustomerDataPage";
import PublicCustomerPage from "./pages/PublicCustomerPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/public/customer/:customerId/:accessToken"
                element={<PublicCustomerPage />}
              />
              <Route path="/public/thank-you" element={<ThankYouPage />} />
              <Route
                path="/kundendaten"
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
              {/* Add a catch-all route at the end that redirects to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
