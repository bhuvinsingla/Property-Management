import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Tabs, Tab, Container } from '@mui/material';
import { propertyTheme } from './theme';
import PropertyForm from './components/PropertyForm';
import VoiceAgentPreview from './components/VoiceAgentPreview';
import LeadsTable from './components/LeadsTable';
import GoogleSheetPreview from './components/GoogleSheetPreview';
import Documentation from './components/Documentation';
import CTASection from './components/CTASection';
import CaseStudy from './components/CaseStudy';
import FloatingCTA from './components/FloatingCTA';
import GuideBot from './components/GuideBot';
import './App.css';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={propertyTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Property Management System
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              AI-Powered Voice Agent Solution
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth={false} sx={{ mt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab label="Property Form" />
              <Tab label="Voice Agent" />
              <Tab label="Leads" />
              <Tab label="Google Sheets" />
              <Tab label="Documentation" />
              <Tab label="Case Study" />
              <Tab label="Get Demo" />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            <GuideBot activeTab={activeTab} />
            <PropertyForm />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <GuideBot activeTab={activeTab} />
            <VoiceAgentPreview />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <GuideBot activeTab={activeTab} />
            <LeadsTable />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <GuideBot activeTab={activeTab} />
            <GoogleSheetPreview />
          </TabPanel>

          <TabPanel value={activeTab} index={4}>
            <Documentation />
          </TabPanel>

          <TabPanel value={activeTab} index={5}>
            <CaseStudy />
          </TabPanel>

          <TabPanel value={activeTab} index={6}>
            <CTASection />
          </TabPanel>
        </Container>

        {/* Floating CTA Buttons - Visible on all pages */}
        <FloatingCTA />
      </Box>
    </ThemeProvider>
  );
}

export default App;
