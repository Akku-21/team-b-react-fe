import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from "./theme";
import CustomerTable from "./components/CustomerTable";
import CustomerDataPage from "./pages/CustomerDataPage";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<CustomerTable />} />
            <Route path="/kundedaten/:customerId" element={<CustomerDataPage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
