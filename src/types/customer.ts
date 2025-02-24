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
    name: string;
    dob: string;
    licenseNumber: string;
    maritalStatus: string;
  };
  insuranceWishes: {
    coverageType: string;
    deductible: number;
    insuranceStart: string;
  };
  personalData: {
    email: string;
    phone: string;
    address: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
  };
  paymentInfo: {
    iban: string;
  };
  guid: string;
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
