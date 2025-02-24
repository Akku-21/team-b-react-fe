import React, { useState, useEffect } from "react";
import { format, isValid, parseISO } from "date-fns";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Customer } from "../types/customer";
import { customerService } from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -10 },
};

const paginationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await customerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to load customers:", error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, "dd.MM.yyyy") : "Invalid Date";
    } catch {
      return "Invalid Date";
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.formData.driverInfo.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.formData.personalData.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / rowsPerPage),
  );
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    setPage(Math.min(Math.max(1, newPage), totalPages));
  };

  return (
    <LayoutGroup>
      <Box className="p-6">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h6" className="font-bold">
            Kundenverwaltung
          </Typography>
          <Button
            variant="contained"
            startIcon={<span className="text-lg font-normal">+</span>}
          >
            Neuer Kunde
          </Button>
        </Box>

        <Box className="flex justify-between items-center mb-6 gap-4">
          <TextField
            placeholder="Kunden suchen..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box className="flex items-center gap-4">
            <Select size="small" defaultValue="" className="min-w-[180px]">
              <MenuItem value="">Sortieren nach</MenuItem>
            </Select>
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              Filter
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className="mb-6 shadow-sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vorname</TableCell>
                <TableCell>Nachname</TableCell>
                <TableCell>Geburtsdatum</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence mode="wait">
                {paginatedCustomers.map((customer) => {
                  const [firstName, lastName] =
                    customer.formData.driverInfo.name.split(" ");
                  return (
                    <motion.tr
                      key={customer.customerId}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        mass: 0.5,
                      }}
                      style={{ display: "table-row" }}
                      layout
                    >
                      <TableCell>{firstName}</TableCell>
                      <TableCell>{lastName}</TableCell>
                      <TableCell>
                        {formatDate(customer.formData.driverInfo.dob)}
                      </TableCell>
                      <TableCell>
                        {customer.formData.personalData.email}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <LinkIcon className="h-5 w-5" />
                        </IconButton>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>

        <motion.div
          layout
          initial="initial"
          animate="animate"
          exit="exit"
          variants={paginationVariants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="flex justify-between items-center text-sm text-gray-600"
        >
          <Typography variant="body2">
            Zeige {(page - 1) * rowsPerPage + 1}-
            {Math.min(page * rowsPerPage, filteredCustomers.length)} von{" "}
            {filteredCustomers.length} Einträgen
          </Typography>
          <Box className="flex items-center gap-2">
            <Button
              variant="text"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Zurück
            </Button>
            <Box className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "contained" : "text"}
                    onClick={() => handlePageChange(pageNum)}
                    className={pageNum === page ? "bg-black" : ""}
                  >
                    {pageNum}
                  </Button>
                ),
              )}
            </Box>
            <Button
              variant="text"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Weiter
            </Button>
          </Box>
        </motion.div>
      </Box>
    </LayoutGroup>
  );
}
