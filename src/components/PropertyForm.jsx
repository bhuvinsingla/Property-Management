import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const PropertyForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    size: '',
    sizeUnit: 'sqft',
    propertyType: '',
    description: '',
  });

  const [convertedSize, setConvertedSize] = useState({
    sqft: '',
    sqm: '',
    acres: '',
    hectares: '',
  });

  const [success, setSuccess] = useState(false);

  const sizeUnits = [
    { value: 'sqft', label: 'Square Feet (sqft)' },
    { value: 'sqm', label: 'Square Meters (sqm)' },
    { value: 'acres', label: 'Acres' },
    { value: 'hectares', label: 'Hectares' },
  ];

  const propertyTypes = [
    'Residential',
    'Commercial',
    'Industrial',
    'Agricultural',
    'Mixed Use',
    'Land',
  ];

  // Conversion factors
  const convertSize = (value, fromUnit) => {
    if (!value || isNaN(value)) {
      setConvertedSize({ sqft: '', sqm: '', acres: '', hectares: '' });
      return;
    }

    const numValue = parseFloat(value);
    let sqft, sqm, acres, hectares;

    // Convert to sqft first
    switch (fromUnit) {
      case 'sqft':
        sqft = numValue;
        break;
      case 'sqm':
        sqft = numValue * 10.764;
        break;
      case 'acres':
        sqft = numValue * 43560;
        break;
      case 'hectares':
        sqft = numValue * 107639;
        break;
      default:
        sqft = numValue;
    }

    // Convert from sqft to all units
    sqm = sqft / 10.764;
    acres = sqft / 43560;
    hectares = sqft / 107639;

    setConvertedSize({
      sqft: sqft.toFixed(2),
      sqm: sqm.toFixed(2),
      acres: acres.toFixed(4),
      hectares: hectares.toFixed(4),
    });
  };

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);

    if (field === 'size' || field === 'sizeUnit') {
      const sizeValue = field === 'size' ? value : formData.size;
      const unit = field === 'sizeUnit' ? value : formData.sizeUnit;
      convertSize(sizeValue, unit);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyData = {
      ...formData,
      id: Date.now(),
      convertedSize,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (simulating DB)
    const existingProperties = JSON.parse(
      localStorage.getItem('properties') || '[]'
    );
    existingProperties.push(propertyData);
    localStorage.setItem('properties', JSON.stringify(existingProperties));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Reset form
    setFormData({
      location: '',
      price: '',
      size: '',
      sizeUnit: 'sqft',
      propertyType: '',
      description: '',
    });
    setConvertedSize({ sqft: '', sqm: '', acres: '', hectares: '' });

    if (onSave) onSave(propertyData);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
        Property Details Form
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter your property details below. All data will be saved to the database
        and made available to the voice agent for customer queries.
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Property saved successfully! Data is now available for the voice agent.
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  required
                  placeholder="e.g., Downtown Mumbai, Sector 15 Noida"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                  placeholder="Enter price"
                  InputProps={{
                    startAdornment: '₹ ',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType', e.target.value)}
                    label="Property Type"
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  required
                  placeholder="Enter size"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Size Unit</InputLabel>
                  <Select
                    value={formData.sizeUnit}
                    onChange={(e) => handleChange('sizeUnit', e.target.value)}
                    label="Size Unit"
                  >
                    {sizeUnits.map((unit) => (
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {formData.size && (
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ bgcolor: 'background.default', p: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Size Conversions:
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Square Feet
                        </Typography>
                        <Typography variant="h6">{convertedSize.sqft}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Square Meters
                        </Typography>
                        <Typography variant="h6">{convertedSize.sqm}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Acres
                        </Typography>
                        <Typography variant="h6">{convertedSize.acres}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Hectares
                        </Typography>
                        <Typography variant="h6">{convertedSize.hectares}</Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Additional details about the property..."
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<SaveIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save Property to Database
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyForm;

