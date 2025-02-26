export interface CustomerFormData {
  vehicleData: {
    make: string;
    model: string;
    year: number;
    vin: string;
    hsnTsn: string;
    licensePlate: string;
    firstRegistration: string;
    firstRegistrationOwner: string;
    currentMileage: string;
  };
  driverInfo: {
    dob: string;
    licenseNumber: string;
    maritalStatus: string;
  };
  insuranceInfo: {
    startDate: string;
    previousInsurance: string;
    previousInsuranceNumber: string;
  };
  personalData: {
    email: string;
    firstName: string;
    lastName: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
  };
  paymentInfo: {
    iban: string;
  };
  guid: string;
  editedByCustomer: boolean;
}

export interface Customer {
  customerId: string;
  formData: CustomerFormData;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
