import React, { useState, useEffect, useRef } from "react";
import {
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
import { useSnackbar } from '../contexts/SnackbarContext';
import { useMask } from '@react-input/mask';

// Enhanced IBAN formatter function
const formatIBAN = (value: string) => {
  // Remove all non-alphanumeric characters
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, '');
  
  // Format with spaces every 4 characters
  let formatted = '';
  for (let i = 0; i < cleaned.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += ' ';
    }
    formatted += cleaned[i];
  }
  
  return formatted;
};

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

interface NewCustomerFormProps {
  onSuccess?: () => void;
  isPublic?: boolean;
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
  onSuccess,
  customerId,
}: NewCustomerFormProps) {
  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  // Create refs for masked inputs
  const ibanInputRef = useMask({ 
    mask: 'XX99 9999 9999 9999 9999 99', 
    replacement: { 
      '9': /\d/,
      'X': /[DE]/i  // Allow D and E characters (case insensitive)
    } 
  });

  useEffect(() => {
    if (customerId) {
      loadCustomerData(customerId);
    }
  }, [customerId]);

  // Format IBAN when data is loaded
  useEffect(() => {
    if (formData.paymentInfo.iban) {
      const formattedIBAN = formatIBAN(formData.paymentInfo.iban);
      handleChange("paymentInfo", "iban", formattedIBAN);
    }
  }, [formData.paymentInfo.iban]);

  const loadCustomerData = async (id: string) => {
    try {
      // Assuming you have an API endpoint to get customer by ID
      const data = await customerService.getCustomerById(id);
      
      // Format IBAN before setting form data
      const formattedData = {
        ...data.formData,
        paymentInfo: {
          ...data.formData.paymentInfo,
          iban: formatIBAN(data.formData.paymentInfo.iban || '')
        }
      };
      
      setFormData(formattedData);
    } catch (error) {
      console.error("Failed to load customer data:", error);
    }
  };

  // Handle IBAN paste event
  const handleIBANPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const formattedIBAN = formatIBAN(pastedText);
    handleChange("paymentInfo", "iban", formattedIBAN);
  };

  // Add validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.personalData.lastName.trim()) {
      newErrors.lastName = 'Nachname ist erforderlich';
    }
    
    // Add email validation
    if (formData.personalData.email && !isValidEmail(formData.personalData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
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
      if (customerId && customerId !== 'new') {
        // Update existing customer
        await customerService.updateCustomer(customerId, formData);
        showSnackbar('Kunde erfolgreich aktualisiert', 'success');
      } else {
        // Create new customer
        const dataToSubmit = {
          ...formData,
          guid: crypto.randomUUID(),
        };
        await customerService.createCustomer(dataToSubmit);
        showSnackbar('Kunde erfolgreich erstellt', 'success');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to save customer:", error);
      showSnackbar(
        customerId && customerId !== 'new' 
          ? 'Fehler beim Aktualisieren des Kunden' 
          : 'Fehler beim Erstellen des Kunden', 
        'error'
      );
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

  // Update date handling to use German format
  const formatDateForDisplay = (dateString: string | null) => {
    if (!dateString) return null;
    return dayjs(dateString);
  };

  const formatDateForStorage = (date: dayjs.Dayjs | null) => {
    if (!date) return "";
    return date.format("YYYY-MM-DD");
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
            value={formatDateForDisplay(formData.driverInfo.dob)}
            onChange={(newValue) =>
              handleChange(
                "driverInfo",
                "dob",
                formatDateForStorage(newValue)
              )
            }
            format="DD.MM.YYYY"
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
              formatDateForDisplay(formData.driverInfo.licenseNumber)
            }
            onChange={(newValue) =>
              handleChange(
                "driverInfo",
                "licenseNumber",
                formatDateForStorage(newValue)
              )
            }
            format="DD.MM.YYYY"
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
            error={!!errors.email}
            helperText={errors.email}
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
            value={formatDateForDisplay(formData.vehicleData.firstRegistration)}
            onChange={(newValue) =>
              handleChange(
                "vehicleData",
                "firstRegistration",
                formatDateForStorage(newValue)
              )
            }
            format="DD.MM.YYYY"
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
            value={formatDateForDisplay(formData.insuranceInfo.startDate)}
            onChange={(newValue) =>
              handleChange(
                "insuranceInfo",
                "startDate",
                formatDateForStorage(newValue)
              )
            }
            format="DD.MM.YYYY"
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
          <TextField
            fullWidth
            size="small"
            label="IBAN"
            placeholder="DE12 3456 7890 1234 5678 90"
            value={formData.paymentInfo.iban}
            onChange={(e) =>
              handleChange("paymentInfo", "iban", e.target.value)
            }
            onPaste={handleIBANPaste}
            inputRef={ibanInputRef}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={fillMockData}
          sx={{
          }}
        >
          Mock Form
        </Button>
        <Box>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting || !formData.personalData.lastName.trim()}
            sx={{ 
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

    return (
      <Box>
        {formContent}
      </Box>
    );
  }

