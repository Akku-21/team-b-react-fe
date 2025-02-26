import React, { useState, useEffect } from "react";
import { format, isValid, parseISO } from "date-fns";
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
  Pagination,
  TableSortLabel,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import HoldDeleteButton from "./HoldDeleteButton";
import { generatePublicAccessLink } from "../utils/linkGenerator";
import { useSnackbar } from "../contexts/SnackbarContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useCustomerStore } from "../store/customerStore";

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
  const { customers, isLoading, error, fetchCustomers, deleteCustomer } =
    useCustomerStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("firstName");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

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
      const firstNameA = a.formData?.personalData?.firstName || "";
      const lastNameA = a.formData?.personalData?.lastName || "";
      const firstNameB = b.formData?.personalData?.firstName || "";
      const lastNameB = b.formData?.personalData?.lastName || "";

      let compareResult = 0;
      switch (sortField) {
        case "firstName":
          compareResult = firstNameA.localeCompare(firstNameB);
          break;
        case "lastName":
          compareResult = lastNameA.localeCompare(lastNameB);
          break;
        case "dob":
          compareResult = (a.formData?.driverInfo?.dob || "").localeCompare(
            b.formData?.driverInfo?.dob || ""
          );
          break;
        case "email":
          compareResult = (a.formData?.personalData?.email || "").localeCompare(
            b.formData?.personalData?.email || ""
          );
          break;
      }
      return sortOrder === "asc" ? compareResult : -compareResult;
    });
  };

  const filteredCustomers = customers.filter((customer) => {
    const firstName = customer.formData?.personalData?.firstName || "";
    const lastName = customer.formData?.personalData?.lastName || "";
    const fullName = `${firstName} ${lastName}`;
    const email = customer.formData?.personalData?.email || "";

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedCustomers = sortCustomers(filteredCustomers);

  const totalPages = Math.ceil(sortedCustomers.length / rowsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      showSnackbar("Kunde erfolgreich gelöscht", "success");
    } catch (error) {
      showSnackbar("Fehler beim Löschen des Kunden", "error");
    }
  };

  const handleCopyLink = (customerId: string) => {
    const publicLink = `${window.location.origin}${generatePublicAccessLink(
      customerId
    )}`;
    navigator.clipboard.writeText(publicLink);
    showSnackbar("Link wurde in die Zwischenablage kopiert", "success");
  };

  const handleMailTo = (email: string, customerId: string) => {
    const publicLink = `${window.location.origin}${generatePublicAccessLink(
      customerId
    )}`;
    const subject = "Ihre Versicherungsdaten";
    const body = `
Sehr geehrte Damen und Herren,

unter folgendem Link können Sie Ihre Versicherungsdaten einsehen und bearbeiten:

${publicLink}

Mit freundlichen Grüßen
Ihr Versicherungsteam
    `.trim();

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  // Update the refresh function to use the store
  const handleRefresh = () => {
    fetchCustomers();
    showSnackbar("Kundendaten aktualisiert", "success");
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
            onClick={() => navigate("/kundedaten/new")}
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
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={() => setSearchTerm("")}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Tooltip title="Daten aktualisieren">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <>
            <TableContainer component={Paper} className="mb-6 shadow-sm">
              <Table>
                <TableHead>
                  <TableRow>
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
                        active={sortField === "firstName"}
                        direction={
                          sortField === "firstName" ? sortOrder : "asc"
                        }
                        onClick={() => handleSort("firstName")}
                      >
                        Vorname
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
                    <TableCell align="center" sx={{ width: "120px" }}>
                      Bearbeitet
                    </TableCell>
                    <TableCell align="right">Aktionen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {paginatedCustomers.map((customer, index) => (
                      <motion.tr
                        key={customer.customerId}
                        onClick={() =>
                          navigate(`/kundedaten/${customer.customerId}`)
                        }
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            index % 2 === 1
                              ? "rgba(0, 0, 0, 0.04)"
                              : "transparent",
                        }}
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
                        layout
                      >
                        <TableCell>
                          {customer.formData?.personalData?.lastName || ""}
                        </TableCell>
                        <TableCell>
                          {customer.formData?.personalData?.firstName || ""}
                        </TableCell>
                        <TableCell>
                          {formatDate(customer.formData?.driverInfo?.dob || "")}
                        </TableCell>
                        <TableCell>
                          {customer.formData?.personalData?.email || ""}
                        </TableCell>
                        <TableCell align="center">
                          {customer.formData?.editedByCustomer ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Link kopieren">
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyLink(customer.customerId);
                              }}
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="E-Mail senden">
                            <IconButton
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMailTo(
                                  customer.formData?.personalData?.email || "",
                                  customer.customerId
                                );
                              }}
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <HoldDeleteButton
                            onDelete={() => handleDelete(customer.customerId)}
                            size="small"
                          />
                        </TableCell>
                      </motion.tr>
                    ))}
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
                  {sortedCustomers.length > 0
                    ? (page - 1) * rowsPerPage + 1
                    : 0}
                  -{Math.min(page * rowsPerPage, sortedCustomers.length)} von{" "}
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
          </>
        )}
      </Box>
    </LayoutGroup>
  );
}
