import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { CustomerFormData } from "../types/customer";
import { customerService } from "../services/api";
import { generateMockData } from "../utils/mockDataGenerator";

interface NewCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
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
    name: "",
    dob: "",
    licenseNumber: "",
    maritalStatus: "",
  },
  insuranceWishes: {
    coverageType: "",
    deductible: 1,
    insuranceStart: "",
  },
  personalData: {
    email: "",
    phone: "",
    address: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  },
  paymentInfo: {
    iban: "",
    bic: "",
    bankName: "",
  },
  guid: "",
};

export default function NewCustomerForm({
  open,
  onClose,
  onSuccess,
}: NewCustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        guid: crypto.randomUUID(),
      };
      await customerService.createCustomer(dataToSubmit);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const formatNumber = (value: string) => {
    const number = value.replace(/\D/g, "");
    return new Intl.NumberFormat("de-DE").format(Number(number));
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Persönliche Informationen
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Familienstand</InputLabel>
                <Select
                  value={formData.driverInfo.maritalStatus}
                  label="Familienstand"
                  onChange={(e) =>
                    handleChange("driverInfo", "maritalStatus", e.target.value)
                  }
                >
                  <MenuItem value="Ledig">Ledig</MenuItem>
                  <MenuItem value="Verheiratet">Verheiratet</MenuItem>
                  <MenuItem value="Geschieden">Geschieden</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Aktueller km-Stand"
                value={formData.vehicleData.currentMileage}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange(
                    "vehicleData",
                    "currentMileage",
                    formatNumber(value),
                  );
                }}
                inputProps={{
                  inputMode: "numeric",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            Zahlungsinformation
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="IBAN"
                value={formData.paymentInfo.iban}
                onChange={(e) =>
                  handleChange("paymentInfo", "iban", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="BIC"
                value={formData.paymentInfo.bic}
                onChange={(e) =>
                  handleChange("paymentInfo", "bic", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Geldinstitut"
                value={formData.paymentInfo.bankName}
                onChange={(e) =>
                  handleChange("paymentInfo", "bankName", e.target.value)
                }
              />
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
                sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
              >
                Daten senden
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
