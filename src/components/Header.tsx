import React from "react";
import { Box, Typography } from "@mui/material";

interface HeaderProps {
  agentName?: string;
  agentRole?: string;
  customerName?: string;
}

export default function Header({
  agentName = "Max Mustermann",
  agentRole = "Versicherungsmakler",
  customerName = "John Doe",
}: HeaderProps) {
  return (
    <Box className="w-full bg-white border-b border-gray-200">
      <Box className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
        <Box className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
            {/* Placeholder for agent image */}
            <svg
              className="w-full h-full text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <Box>
            <Typography variant="subtitle1" className="font-medium">
              {agentName}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              {agentRole}
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="text-gray-600">
            Kunde:
          </Typography>
          <Typography variant="body1" className="font-medium">
            {customerName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
