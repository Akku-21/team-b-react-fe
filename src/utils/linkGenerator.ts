export const generatePublicAccessLink = (customerId: string): string => {
  // In a real app, this would involve proper token generation and storage
  const accessToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return `/public/customer/${customerId}/${accessToken}`;
}; 