import { Box, Typography, Paper } from "@mui/material";
import NewCustomerForm from "../components/NewCustomerForm";
import { useParams, useNavigate } from "react-router-dom";

export default function PublicCustomerPage() {
  const { customerId, accessToken } = useParams<{
    customerId: string;
    accessToken: string;
  }>();
  const navigate = useNavigate();
  // Validate the access token format (in a real app, this would be more secure)
  const isValidAccessToken = accessToken?.match(/^[a-zA-Z0-9-_]{10,}$/);

  if (!isValidAccessToken) {
    navigate("/public/invalid-link");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: 4,
        px: 2,
      }}
    >
      <Paper
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Datenabfrage für Ihre Kfz-Versicherung
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4 }}
          align="center"
          color="text.secondary"
        >
          Bitte füllen Sie die fehlenden Daten so weit wie möglich aus. So
          können wir bestens vorbereitet in Ihre Beratung starten.
        </Typography>
        <NewCustomerForm
          customerId={customerId}
          isPublic
          onSuccess={() => {
            navigate("/public/thank-you");
          }}
        />
      </Paper>
    </Box>
  );
}
