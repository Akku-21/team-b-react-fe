import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { theme } from "./theme";
import CustomerTable from "./components/CustomerTable";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <CustomerTable />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
