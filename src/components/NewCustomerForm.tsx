import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CustomerFormData } from "../types/customer";
import { customerService } from "../services/api";
import { generateMockData } from "../utils/mockDataGenerator";
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';

interface NewCustomerFormProps {
  open?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  isPage?: boolean;
  customerId?: string;
}

const initialFormData: CustomerFormData = {
  vehicleData: {
    make: "",
    model: "",
    year: 2024,
    vin: "",
    hsnTsn: "",
    licensePlate: "",
    firstRegistration: "",
    firstRegistrationOwner: "",
    currentMileage: "",
  },
  driverInfo: {
    dob: "",
    licenseNumber: "",
    maritalStatus: "",
  },
  insuranceInfo: {
    startDate: "",
    previousInsurance: "",
    previousInsuranceNumber: "",
  },
  personalData: {
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  },
  paymentInfo: {
    iban: "",
  },
  guid: "",
};

// Add this interface to define required fields
interface ValidationErrors {
  [key: string]: string;
}

export default function NewCustomerForm({
  open,
  onClose,
  onSuccess,
  isPage = false,
  customerId,
}: NewCustomerFormProps) {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (customerId) {
      loadCustomerData(customerId);
    }
  }, [customerId]);

  const loadCustomerData = async (id: string) => {
    try {
      // Assuming you have an API endpoint to get customer by ID
      const data = await customerService.getCustomerById(id);
      setFormData(data.formData);
    } catch (error) {
      console.error("Failed to load customer data:", error);
    }
  };

  // Add validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.personalData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update handleSubmit to include validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showSnackbar('Bitte füllen Sie alle erforderlichen Felder aus', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        guid: crypto.randomUUID(),
      };
      await customerService.createCustomer(dataToSubmit);
      showSnackbar('Kunde erfolgreich erstellt', 'success');
      if (onSuccess) {
        onSuccess();
      }
      if (onClose) {
        onClose();
      }
      if (isPage) {
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
      showSnackbar('Fehler beim Erstellen des Kunden', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    section: keyof CustomerFormData,
    field: string,
    value: string | number,
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section] as Record<string, string | number>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  };

  const fillMockData = () => {
    setFormData(generateMockData());
  };

  const formContent = (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Persönliche Informationen
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Vorname"
            value={formData.personalData.firstName}
            onChange={(e) =>
              handleChange("personalData", "firstName", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            size="small"
            label="Nachname"
            value={formData.personalData.lastName}
            onChange={(e) =>
              handleChange("personalData", "lastName", e.target.value)
            }
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Geburtsdatum"
            value={
              formData.driverInfo.dob
                ? dayjs(formData.driverInfo.dob)
                : null
            }
            onChange={(newValue) =>
              handleChange(
                "driverInfo",
                "dob",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            size="small"
            value={formData.driverInfo.maritalStatus}
            onChange={(e) =>
              handleChange("driverInfo", "maritalStatus", e.target.value)
            }
            displayEmpty
          >
            <MenuItem value="">Familienstand</MenuItem>
            <MenuItem value="Ledig">Ledig</MenuItem>
            <MenuItem value="Verheiratet">Verheiratet</MenuItem>
            <MenuItem value="Geschieden">Geschieden</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Führerscheindatum"
            value={
              formData.driverInfo.licenseNumber
                ? dayjs(formData.driverInfo.licenseNumber)
                : null
            }
            onChange={(newValue) =>
              handleChange(
                "driverInfo",
                "licenseNumber",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="E-Mail Adresse"
            value={formData.personalData.email}
            onChange={(e) =>
              handleChange("personalData", "email", e.target.value)
            }
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Adresse
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Straße"
            value={formData.personalData.street}
            onChange={(e) =>
              handleChange("personalData", "street", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Hausnummer"
            value={formData.personalData.houseNumber}
            onChange={(e) =>
              handleChange("personalData", "houseNumber", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Postleitzahl"
            value={formData.personalData.postalCode}
            onChange={(e) =>
              handleChange("personalData", "postalCode", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Ort"
            value={formData.personalData.city}
            onChange={(e) =>
              handleChange("personalData", "city", e.target.value)
            }
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Fahrzeugdaten
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="HSN"
            value={formData.vehicleData.hsnTsn.split(" ")[0] || ""}
            onChange={(e) =>
              handleChange(
                "vehicleData",
                "hsnTsn",
                `${e.target.value} ${formData.vehicleData.hsnTsn.split(" ")[1] || ""}`,
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="TSN"
            value={formData.vehicleData.hsnTsn.split(" ")[1] || ""}
            onChange={(e) =>
              handleChange(
                "vehicleData",
                "hsnTsn",
                `${formData.vehicleData.hsnTsn.split(" ")[0] || ""} ${e.target.value}`,
              )
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Kennzeichen"
            value={formData.vehicleData.licensePlate}
            onChange={(e) =>
              handleChange("vehicleData", "licensePlate", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Erstzulassung"
            value={
              formData.vehicleData.firstRegistration
                ? dayjs(formData.vehicleData.firstRegistration)
                : null
            }
            onChange={(newValue) =>
              handleChange(
                "vehicleData",
                "firstRegistration",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Aktueller km-Stand"
            value={formData.vehicleData.currentMileage}
            onChange={(e) =>
              handleChange("vehicleData", "currentMileage", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Fahrzeugidentifikationsnummer"
            value={formData.vehicleData.vin}
            onChange={(e) =>
              handleChange("vehicleData", "vin", e.target.value)
            }
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Versicherungsinformationen
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Versicherungsbeginn"
            value={
              formData.insuranceInfo.startDate
                ? dayjs(formData.insuranceInfo.startDate)
                : null
            }
            onChange={(newValue) =>
              handleChange(
                "insuranceInfo",
                "startDate",
                newValue ? newValue.format("YYYY-MM-DD") : "",
              )
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Bisherige Versicherung"
            value={formData.insuranceInfo.previousInsurance}
            onChange={(e) =>
              handleChange(
                "insuranceInfo",
                "previousInsurance",
                e.target.value,
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Bisherige Versicherungsnummer"
            value={formData.insuranceInfo.previousInsuranceNumber}
            onChange={(e) =>
              handleChange(
                "insuranceInfo",
                "previousInsuranceNumber",
                e.target.value,
              )
            }
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Zahlungsinformation
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <InputMask
            mask="DE99 9999 9999 9999 9999 99"
            value={formData.paymentInfo.iban}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("paymentInfo", "iban", e.target.value)
            }
          >
            {(inputProps: { onChange: React.ChangeEventHandler<HTMLInputElement>; value: string }) => (
              <TextField
                {...inputProps}
                fullWidth
                size="small"
                label="IBAN"
                placeholder="DE12 3456 7890 1234 5678 90"
              />
            )}
          </InputMask>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={fillMockData}
          sx={{
            borderColor: "black",
            color: "black",
            "&:hover": { borderColor: "#333", color: "#333" },
          }}
        >
          Mock Form
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Abbrechen
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || !formData.personalData.lastName.trim()}
            sx={{ 
              bgcolor: "black", 
              "&:hover": { bgcolor: "#333" },
              minWidth: '120px'
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Daten senden'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );

  if (isPage) {
    return (
      <Box>
        <Typography variant="h5" component="div" gutterBottom>
          Kundendaten
        </Typography>
        {formContent}
      </Box>
    );
  }

  return (
    <Dialog open={open || false} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div">
          Datenabfrage für Ihre Kfz-Versicherung
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Bitte füllen Sie die fehlenden Daten so weit wie möglich aus. So
          können wir bestens vorbereitet in Ihre Beratung starten.
        </Typography>
      </DialogTitle>
      <DialogContent>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
