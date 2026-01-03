import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Paper,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  PhoneInTalk as InboundIcon,
  PhoneCallback as OutboundIcon,
  Mic as MicIcon,
  VolumeUp as VolumeIcon,
} from '@mui/icons-material';

const VoiceAgentPreview = () => {
  const [activeCall, setActiveCall] = useState(null);
  const [callHistory, setCallHistory] = useState([]);
  const [isCalling, setIsCalling] = useState(false);

  const mockCalls = [
    {
      id: 1,
      type: 'inbound',
      number: '+91 98765 43210',
      name: 'Rajesh Kumar',
      duration: '2:34',
      status: 'completed',
      query: 'Looking for 3BHK in Noida',
      leadGenerated: true,
    },
    {
      id: 2,
      type: 'outbound',
      number: '+91 91234 56789',
      name: 'Priya Sharma',
      duration: '1:45',
      status: 'completed',
      query: 'Interested in commercial property',
      leadGenerated: true,
    },
    {
      id: 3,
      type: 'inbound',
      number: '+91 99876 54321',
      name: 'Amit Patel',
      duration: '0:00',
      status: 'active',
      query: 'Enquiring about property prices',
      leadGenerated: false,
    },
  ];

  useEffect(() => {
    setCallHistory(mockCalls);
  }, []);

  const startCall = (type) => {
    setIsCalling(true);
    const newCall = {
      id: Date.now(),
      type,
      number: type === 'inbound' ? '+91 98765 43210' : '+91 91234 56789',
      name: type === 'inbound' ? 'Incoming Call' : 'Outgoing Call',
      duration: '0:00',
      status: 'active',
      query: 'Voice agent is collecting information...',
      leadGenerated: false,
    };
    setActiveCall(newCall);
    setCallHistory([newCall, ...callHistory]);

    // Simulate call progress
    setTimeout(() => {
      setIsCalling(false);
      setActiveCall(null);
    }, 5000);
  };

  const getPropertiesFromDB = () => {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    return properties;
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 1, color: 'primary.main' }}>
        Voice Agent Preview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        AI-powered voice agent trained for property queries. Handles both inbound
        and outbound calls, collects leads, and fetches property details from the database.
      </Typography>

      <Grid container spacing={3}>
        {/* Call Controls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Start Call
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<InboundIcon />}
                  onClick={() => startCall('inbound')}
                  disabled={isCalling}
                  fullWidth
                  size="large"
                >
                  Simulate Inbound Call
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<OutboundIcon />}
                  onClick={() => startCall('outbound')}
                  disabled={isCalling}
                  fullWidth
                  size="large"
                >
                  Simulate Outbound Call
                </Button>
              </Box>

              {isCalling && (
                <Box sx={{ mt: 3 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                    Call in progress...
                  </Typography>
                </Box>
              )}

              {activeCall && (
                <Paper sx={{ p: 2, mt: 3, bgcolor: 'background.default' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PhoneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{activeCall.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activeCall.number}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={activeCall.type === 'inbound' ? 'Inbound' : 'Outbound'}
                    color={activeCall.type === 'inbound' ? 'success' : 'primary'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              )}
            </CardContent>
          </Card>

          {/* Database Info */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Database Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Properties in DB: {getPropertiesFromDB().length}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                The voice agent can query these properties based on location, price,
                and size requirements.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Call History */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Call History & Lead Collection
              </Typography>
              <Box sx={{ mt: 2 }}>
                {callHistory.map((call) => (
                  <Paper
                    key={call.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderLeft: `4px solid ${
                        call.type === 'inbound' ? '#4caf50' : '#1a5f3f'
                      }`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {call.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {call.number}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={call.type === 'inbound' ? 'Inbound' : 'Outbound'}
                          color={call.type === 'inbound' ? 'success' : 'primary'}
                          size="small"
                        />
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                          {call.duration}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Query:</strong> {call.query}
                    </Typography>
                    {call.leadGenerated && (
                      <Chip
                        label="Lead Generated"
                        color="success"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How Voice Agent Works
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 2 }}>
                <li>
                  <Typography variant="body2">
                    Receives/initiates calls and greets customers professionally
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Understands customer requirements (location, budget, size)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Queries the database for matching properties
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Provides property details and answers questions
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Collects customer information and generates leads
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Saves leads automatically for follow-up
                  </Typography>
                </li>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VoiceAgentPreview;

