import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import CustomerTable from "./components/CustomerTable";
import CustomerDataPage from "./pages/CustomerDataPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
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
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <CustomerTable />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kundedaten/:customerId"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <CustomerDataPage />
                    </>
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
