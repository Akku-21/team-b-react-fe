import { CustomerFormData } from "../types/customer";

const CITIES = ['München', 'Berlin', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Düsseldorf'];
const STREETS = ['Hauptstraße', 'Bahnhofstraße', 'Schulstraße', 'Gartenweg', 'Kirchplatz', 'Marktplatz'];
const MAKES = ['BMW', 'Mercedes', 'Audi', 'VW', 'Porsche', 'Opel'];
const MODELS = {
  BMW: ['320i', '520d', 'X3', 'X5', 'M3'],
  Mercedes: ['C200', 'E350', 'GLC', 'A200', 'S500'],
  Audi: ['A4', 'A6', 'Q5', 'RS6', 'e-tron'],
  VW: ['Golf', 'Passat', 'Tiguan', 'ID.4', 'Polo'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Taycan', 'Panamera'],
  Opel: ['Corsa', 'Astra', 'Insignia', 'Mokka', 'Grandland']
};
const MARITAL_STATUS = ['Ledig', 'Verheiratet', 'Geschieden'];
const FIRST_NAMES = ['Max', 'Anna', 'Paul', 'Maria', 'Thomas', 'Laura', 'Michael', 'Sarah'];
const LAST_NAMES = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner'];
const EMAIL_DOMAINS = ['gmail.com', 'yahoo.de', 'outlook.com', 'web.de', 'gmx.de', 't-online.de'];

const randomElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateEmail = (firstName: string, lastName: string): string => {
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${randomNumber(1, 99)}`,
    `${lastName.toLowerCase()}.${firstName.toLowerCase()}`,
    `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}`,
    `${lastName.toLowerCase()}${randomNumber(1, 999)}`
  ];
  return `${randomElement(formats)}@${randomElement(EMAIL_DOMAINS)}`;
};

const generateIBAN = (): string => {
  const countryCode = 'DE';
  const bankCode = String(randomNumber(10000000, 99999999));
  const accountNumber = String(randomNumber(1000000000, 9999999999));
  return `${countryCode}${bankCode}${accountNumber}`;
};

const generateLicensePlate = (): string => {
  const cities = ['M', 'B', 'F', 'K', 'S', 'H'];
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const city = randomElement(cities);
  const letter1 = randomElement(letters.split(''));
  const letter2 = randomElement(letters.split(''));
  const number = randomNumber(1, 9999);
  return `${city} ${letter1}${letter2} ${number}`;
};

const generateHsnTsn = (): string => {
  const hsn = String(randomNumber(1000, 9999)).padStart(4, '0');
  const tsn = String(randomNumber(100, 999));
  return `${hsn} ${tsn}`;
};

const generateVIN = (): string => {
  const chars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
  return Array.from({ length: 17 }, () => randomElement(chars.split(''))).join('');
};

const formatMileage = (km: number): string => {
  return new Intl.NumberFormat('de-DE').format(km);
};

// Add a function to generate random phone numbers
const generatePhoneNumber = (): string => {
  const formats = [
    `+49 ${randomNumber(100, 999)} ${randomNumber(1000000, 9999999)}`,
    `0${randomNumber(100, 999)} ${randomNumber(100000, 9999999)}`,
    `0${randomNumber(1000, 9999)} ${randomNumber(10000, 999999)}`
  ];
  return randomElement(formats);
};

export const generateMockData = ():CustomerFormData => {
  const make = randomElement(MAKES);
  const now = new Date();
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const dobStart = new Date(now.getFullYear() - 70, 0, 1);
  const dobEnd = new Date(now.getFullYear() - 18, 0, 1);
  const licenseStart = new Date(now.getFullYear() - 30, 0, 1);

  const firstName = randomElement(FIRST_NAMES);
  const lastName = randomElement(LAST_NAMES);

  return {
    vehicleData: {
      make,
      model: randomElement(MODELS[make as keyof typeof MODELS]),
      year: now.getFullYear(),
      vin: generateVIN(),
      hsnTsn: generateHsnTsn(),
      licensePlate: generateLicensePlate(),
      firstRegistration: randomDate(yearStart, now),
      firstRegistrationOwner: randomDate(yearStart, now),
      currentMileage: formatMileage(randomNumber(1000, 150000))
    },
    driverInfo: {
      dob: randomDate(dobStart, dobEnd),
      licenseNumber: randomDate(licenseStart, now),
      maritalStatus: randomElement(MARITAL_STATUS)
    },
    insuranceInfo: {
        startDate: randomDate(now, new Date(now.getFullYear() + 1, 0, 1)),
        previousInsurance: "foo",
        previousInsuranceNumber: "123",
      },
    personalData: {
      email: generateEmail(firstName, lastName),
      firstName: firstName,
      lastName: lastName,
      street: randomElement(STREETS),
      houseNumber: String(randomNumber(1, 150)),
      postalCode: String(randomNumber(10000, 99999)),
      city: randomElement(CITIES),
      phoneNumber: generatePhoneNumber(),
    },
    paymentInfo: {
      iban: generateIBAN(),
    },
    guid: '',
    editedByCustomer: false
  };
};
