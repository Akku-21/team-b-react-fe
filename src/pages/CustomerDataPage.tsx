import { useParams } from 'react-router-dom';
import NewCustomerForm from '../components/NewCustomerForm';
import { Box } from '@mui/material';

export default function CustomerDataPage() {
  const { customerId } = useParams();
  
  return (
    <Box className="p-6">
      <NewCustomerForm isPage customerId={customerId} />
    </Box>
  );
} 