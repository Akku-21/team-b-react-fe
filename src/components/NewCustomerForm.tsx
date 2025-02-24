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
import { CustomerFormData } from "../types/customer";
import { customerService } from "../services/api";
import { v4 as uuidv4 } from "uuid";

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
        guid: uuidv4(),
      };
      await customerService.createCustomer(dataToSubmit);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create customer:", error);
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2">
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
              <TextField
                fullWidth
                label="Geburtsdatum"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.driverInfo.dob}
                onChange={(e) =>
                  handleChange("driverInfo", "dob", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
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
              <TextField
                fullWidth
                label="Führerscheindatum"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.driverInfo.licenseNumber}
                onChange={(e) =>
                  handleChange("driverInfo", "licenseNumber", e.target.value)
                }
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Adresse
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Straße"
                value={formData.personalData.street}
                onChange={(e) =>
                  handleChange("personalData", "street", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Hausnummer"
                value={formData.personalData.houseNumber}
                onChange={(e) =>
                  handleChange("personalData", "houseNumber", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Postleitzahl"
                value={formData.personalData.postalCode}
                onChange={(e) =>
                  handleChange("personalData", "postalCode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
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
                label="Kennzeichen"
                value={formData.vehicleData.licensePlate}
                onChange={(e) =>
                  handleChange("vehicleData", "licensePlate", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Erstzulassung"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.vehicleData.firstRegistration}
                onChange={(e) =>
                  handleChange(
                    "vehicleData",
                    "firstRegistration",
                    e.target.value,
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Aktueller km-Stand"
                value={formData.vehicleData.currentMileage}
                onChange={(e) =>
                  handleChange("vehicleData", "currentMileage", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
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
                label="IBAN"
                value={formData.paymentInfo.iban}
                onChange={(e) =>
                  handleChange("paymentInfo", "iban", e.target.value)
                }
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
      </DialogContent>
    </Dialog>
  );
}
