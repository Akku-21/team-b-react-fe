import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import DancingOwl from "../components/DancingOwl";

export default function OwlPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Tanzende Eule
      </Typography>
      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 1,
          width: "100%",
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <DancingOwl />
        </Box>
      </Paper>
    </Box>
  );
}
