import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load leads from localStorage
    const savedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    if (savedLeads.length === 0) {
      // Mock data for demonstration
      const mockLeads = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          phone: '+91 98765 43210',
          email: 'rajesh.kumar@email.com',
          location: 'Noida',
          propertyType: '3BHK Residential',
          budget: '₹ 50,00,000',
          status: 'New',
          source: 'Inbound Call',
          date: '2024-01-15',
        },
        {
          id: 2,
          name: 'Priya Sharma',
          phone: '+91 91234 56789',
          email: 'priya.sharma@email.com',
          location: 'Mumbai',
          propertyType: 'Commercial',
          budget: '₹ 2,00,00,000',
          status: 'Contacted',
          source: 'Outbound Call',
          date: '2024-01-14',
        },
        {
          id: 3,
          name: 'Amit Patel',
          phone: '+91 99876 54321',
          email: 'amit.patel@email.com',
          location: 'Ahmedabad',
          propertyType: '2BHK Residential',
          budget: '₹ 35,00,000',
          status: 'Qualified',
          source: 'Inbound Call',
          date: '2024-01-13',
        },
        {
          id: 4,
          name: 'Sneha Reddy',
          phone: '+91 98765 12345',
          email: 'sneha.reddy@email.com',
          location: 'Bangalore',
          propertyType: '4BHK Residential',
          budget: '₹ 1,20,00,000',
          status: 'New',
          source: 'Inbound Call',
          date: '2024-01-12',
        },
      ];
      localStorage.setItem('leads', JSON.stringify(mockLeads));
      setLeads(mockLeads);
    } else {
      setLeads(savedLeads);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'default';
      case 'Contacted':
        return 'info';
      case 'Qualified':
        return 'success';
      case 'Converted':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main' }}>
        Collected Leads
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        All leads collected by the voice agent are displayed here. These leads can
        be exported to Google Sheets for further management.
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Leads Database</Typography>
            <TextField
              size="small"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Contact</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Location</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Property Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Budget</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Source</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No leads found. Leads will appear here once the voice agent
                        collects customer information.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {lead.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <PhoneIcon fontSize="small" color="action" />
                            <Typography variant="body2">{lead.phone}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography variant="body2" fontSize="0.75rem" color="text.secondary">
                              {lead.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="body2">{lead.location}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{lead.propertyType}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {lead.budget}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={lead.status}
                          color={getStatusColor(lead.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontSize="0.75rem">
                          {lead.source}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontSize="0.75rem">
                          {lead.date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Total Leads: {filteredLeads.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredLeads.length} of {leads.length} leads
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LeadsTable;

