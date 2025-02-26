// Email validation function
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Postal code validation function for Germany (5 digits)
export const isValidPostalCode = (postalCode: string): boolean => {
  const postalCodeRegex = /^\d{5}$/;
  return postalCodeRegex.test(postalCode);
};

// City validation function
export const isValidCity = (city: string): boolean => {
  return city.trim().length >= 2; // City name should be at least 2 characters
};

// Simple mapping of postal code prefixes to regions
// This is a simplified version - a complete database would be much larger
const postalCodeRegions: Record<string, string[]> = {
  "0": ["Dresden", "Leipzig", "Chemnitz", "Erfurt", "Jena", "Gera"],
  "1": ["Berlin", "Potsdam", "Frankfurt (Oder)", "Cottbus"],
  "2": ["Hamburg", "Kiel", "Lübeck", "Rostock", "Schwerin"],
  "3": ["Hannover", "Braunschweig", "Magdeburg", "Wolfsburg"],
  "4": ["Bremen", "Osnabrück", "Oldenburg", "Münster", "Bielefeld"],
  "5": ["Köln", "Bonn", "Düsseldorf", "Aachen", "Essen", "Duisburg"],
  "6": ["Frankfurt am Main", "Darmstadt", "Kassel", "Wiesbaden", "Mainz"],
  "7": ["Stuttgart", "Karlsruhe", "Mannheim", "Heidelberg", "Pforzheim"],
  "8": ["München", "Augsburg", "Nürnberg", "Regensburg", "Ingolstadt"],
  "9": ["Würzburg", "Bamberg", "Bayreuth", "Hof", "Coburg"],
};

// Function to check if postal code and city match
export const postalCodeAndCityMatch = (
  postalCode: string,
  city: string
): boolean => {
  if (!postalCode || !city || !isValidPostalCode(postalCode)) {
    return false;
  }

  // Get the first digit of the postal code to determine the region
  const regionPrefix = postalCode.charAt(0);
  const possibleCities = postalCodeRegions[regionPrefix] || [];

  // Check if the city is in the list of possible cities for this region
  // Use a case-insensitive comparison and check if the city name contains any of the possible cities
  return possibleCities.some((possibleCity) =>
    city.toLowerCase().includes(possibleCity.toLowerCase()) ||
    possibleCity.toLowerCase().includes(city.toLowerCase())
  );
};

// Function to suggest cities based on postal code
export const suggestCitiesForPostalCode = (postalCode: string): string[] => {
  if (!postalCode || !isValidPostalCode(postalCode)) {
    return [];
  }

  const regionPrefix = postalCode.charAt(0);
  return postalCodeRegions[regionPrefix] || [];
}; 