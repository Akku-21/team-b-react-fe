import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";
import NewCustomerForm from "../components/NewCustomerForm";
import { customerService } from "../services/api";
import { useSnackbar } from "../contexts/SnackbarContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CustomerDataPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customerId && customerId !== "new") {
      loadCustomerData();
    } else {
      setLoading(false);
    }
  }, [customerId]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);
      const data = await customerService.getCustomerById(customerId!);
      setCustomer(data);
      setError(null);
    } catch (error) {
      console.error("Failed to load customer:", error);
      setError("Kunde konnte nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigate("/kundendaten");
  };

  // Add function to reset editedByCustomer flag
  const handleResetEditedByCustomer = async () => {
    if (!customer || !customerId) return;

    try {
      // Create updated form data with editedByCustomer set to false
      const updatedFormData = {
        ...customer.formData,
        editedByCustomer: false,
      };

      // Update the customer with the modified data
      await customerService.updateCustomer(customerId, updatedFormData);

      // Update local state
      setCustomer({
        ...customer,
        formData: updatedFormData,
      });

      showSnackbar("Bearbeitungsstatus zurückgesetzt", "success");
    } catch (error) {
      console.error("Failed to reset edited status:", error);
      showSnackbar("Fehler beim Zurücksetzen des Bearbeitungsstatus", "error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/kundendaten")}
        >
          Zurück zur Übersicht
        </Button>
        <Typography variant="h5">
          {customerId === "new"
            ? "Neuen Kunden anlegen"
            : "Kundendaten bearbeiten"}
        </Typography>
        <Box sx={{ width: 100 }} /> {/* Spacer for alignment */}
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ p: 3 }}>
          {/* Add reset editedByCustomer control if this is an existing customer */}
          {customerId &&
            customerId !== "new" &&
            customer?.formData?.editedByCustomer && (
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Alert severity="info" sx={{ flexGrow: 1, mr: 2 }}>
                  Dieser Datensatz wurde vom Kunden bearbeitet.
                </Alert>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleResetEditedByCustomer}
                >
                  Bearbeitungsstatus zurücksetzen
                </Button>
              </Box>
            )}

          <NewCustomerForm customerId={customerId} onSuccess={handleSuccess} />
        </Paper>
      )}
    </Box>
  );
}
