import { useState } from 'react';
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  SmartToy as AIIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const FloatingCTA = () => {
  const [open, setOpen] = useState(false);
  const [activeCTA, setActiveCTA] = useState(null);

  const handleVapiCall = () => {
    // Initialize Vapi call
    const vapiPhoneNumber = '+1-XXX-XXX-XXXX'; // Your Vapi phone number
    window.location.href = `tel:${vapiPhoneNumber}`;
    setOpen(false);
  };

  const handleScheduleCall = () => {
    setActiveCTA('schedule');
    setOpen(true);
  };

  const handleTryAI = () => {
    setActiveCTA('ai');
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Try AI Assistant Button */}
        <Fab
          color="primary"
          aria-label="Try AI Assistant"
          onClick={handleTryAI}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <AIIcon sx={{ fontSize: 28 }} />
        </Fab>

        {/* Schedule Call Button */}
        <Fab
          color="secondary"
          aria-label="Schedule Call"
          onClick={handleScheduleCall}
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'secondary.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <CalendarIcon sx={{ fontSize: 28 }} />
        </Fab>

        {/* Quick Call Button */}
        <Fab
          color="success"
          aria-label="Call Now"
          href="tel:+917355635544"
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            width: 64,
            height: 64,
            boxShadow: 4,
            '&:hover': {
              bgcolor: 'success.dark',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s',
          }}
        >
          <PhoneIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Box>

      {/* Dialog for CTA Actions */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setActiveCTA(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {activeCTA === 'ai' ? 'Try AI Assistant' : 'Schedule a Demo Call'}
            </Typography>
            <IconButton onClick={() => {
              setOpen(false);
              setActiveCTA(null);
            }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {activeCTA === 'ai' ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <AIIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Experience Our AI Voice Agent
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click the button below to initiate a call with our AI assistant. Ask about properties,
                get instant answers, and see how it handles inquiries 24/7.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<PhoneIcon />}
                onClick={handleVapiCall}
                sx={{ minWidth: 200 }}
              >
                Call AI Assistant Now
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Fill in your details to schedule a personalized demo call. We'll send you an email and WhatsApp message with the details.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    // Redirect to WhatsApp (primary action)
                    const whatsappMessage = encodeURIComponent(
                      `👋 Hello Bhuvin!\n\n` +
                      `I would like to schedule a *demo call* for the Property Management System.\n\n` +
                      `Please let me know your availability. Thank you! 🙏`
                    );
                    window.open(`https://wa.me/917355635544?text=${whatsappMessage}`, '_blank');
                  }}
                  startIcon={<CalendarIcon />}
                >
                  Schedule Demo Call
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Or contact us directly via phone or WhatsApp
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingCTA;

