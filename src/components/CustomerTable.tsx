import React, { useState, useEffect } from "react";
import { format, isValid, parseISO } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { Customer } from "../types/customer";
import { customerService } from "../services/api";
import NewCustomerForm from "./NewCustomerForm";
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
  Pagination,
  TableSortLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type SortField = "firstName" | "lastName" | "dob" | "email";
type SortOrder = "asc" | "desc";

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
  const [isNewCustomerFormOpen, setIsNewCustomerFormOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const rowsPerPage = 10;

  useEffect(() => {
    loadCustomers();
  }, []);

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortCustomers = (customers: Customer[]) => {
    return [...customers].sort((a, b) => {
      const [firstNameA, lastNameA] = a.formData.driverInfo.name.split(" ");
      const [firstNameB, lastNameB] = b.formData.driverInfo.name.split(" ");

      let compareResult = 0;
      switch (sortField) {
        case "firstName":
          compareResult = firstNameA.localeCompare(firstNameB);
          break;
        case "lastName":
          compareResult = lastNameA.localeCompare(lastNameB);
          break;
        case "dob":
          compareResult = a.formData.driverInfo.dob.localeCompare(
            b.formData.driverInfo.dob,
          );
          break;
        case "email":
          compareResult = a.formData.personalData.email.localeCompare(
            b.formData.personalData.email,
          );
          break;
      }
      return sortOrder === "asc" ? compareResult : -compareResult;
    });
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

  const sortedCustomers = sortCustomers(filteredCustomers);

  const totalPages = Math.ceil(sortedCustomers.length / rowsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleNewCustomerSuccess = () => {
    loadCustomers();
  };

  const handleDelete = async (customerId: string) => {
    try {
      await customerService.deleteCustomer(customerId);
      loadCustomers();
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
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
            onClick={() => setIsNewCustomerFormOpen(true)}
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
                <TableCell>
                  <TableSortLabel
                    active={sortField === "firstName"}
                    direction={sortField === "firstName" ? sortOrder : "asc"}
                    onClick={() => handleSort("firstName")}
                  >
                    Vorname
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "lastName"}
                    direction={sortField === "lastName" ? sortOrder : "asc"}
                    onClick={() => handleSort("lastName")}
                  >
                    Nachname
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "dob"}
                    direction={sortField === "dob" ? sortOrder : "asc"}
                    onClick={() => handleSort("dob")}
                  >
                    Geburtsdatum
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "email"}
                    direction={sortField === "email" ? sortOrder : "asc"}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
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
                          color="error"
                          onClick={() => handleDelete(customer.customerId)}
                          size="small"
                        >
                          <DeleteIcon />
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
          className="flex justify-end items-center text-sm text-gray-600"
        >
          <Box className="flex justify-between items-center gap-4">
            <Typography variant="body2" className="text-gray-600">
              Zeige{" "}
              {sortedCustomers.length > 0 ? (page - 1) * rowsPerPage + 1 : 0}-
              {Math.min(page * rowsPerPage, sortedCustomers.length)} von{" "}
              {sortedCustomers.length} Einträgen
            </Typography>
            <Pagination
              className="align-end"
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        </motion.div>

        <NewCustomerForm
          open={isNewCustomerFormOpen}
          onClose={() => setIsNewCustomerFormOpen(false)}
          onSuccess={handleNewCustomerSuccess}
        />
      </Box>
    </LayoutGroup>
  );
}
