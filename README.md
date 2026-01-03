# Property Management System

A comprehensive Property Management System with AI-powered Voice Agent integration. This system allows property dealers to manage properties, handle customer queries through voice agents, and track leads efficiently.

## Features

### 🏠 Property Form
- Enter property details (location, price, size, type)
- Automatic size unit conversions (sqft, sqm, acres, hectares)
- Data saved to database for voice agent queries

### 🎙️ Voice Agent
- AI-powered voice agent for inbound/outbound calls
- Automatically queries property database
- Collects customer information and generates leads
- Handles property-related queries intelligently

### 📊 Leads Management
- View all collected leads in tabular format
- Search and filter functionality
- Track lead status and progression
- Customer contact information and preferences

### 📈 Google Sheets Integration
- Spreadsheet-like interface for leads
- Export to CSV functionality
- Ready for Google Sheets API integration
- Team collaboration support

### 🤖 Interactive Guide Bot
- Step-by-step guidance for each section
- Context-aware help system
- User-friendly onboarding experience

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **Emotion** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bhuvinsingla/Property-Management.git
cd Property-Management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
vite-project/
├── public/
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── PropertyForm.jsx
│   │   ├── VoiceAgentPreview.jsx
│   │   ├── LeadsTable.jsx
│   │   ├── GoogleSheetPreview.jsx
│   │   └── GuideBot.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── theme.js
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. **Property Form**: Enter property details in the first tab. All data is saved to localStorage (simulating database).

2. **Voice Agent**: Simulate calls to see how the voice agent queries properties and collects leads.

3. **Leads**: View all collected leads with search and filter options.

4. **Google Sheets**: Export leads or view them in spreadsheet format.

## Data Storage

Currently, the application uses browser localStorage to simulate database storage. In production, this would be replaced with a backend API and database.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Bhuvin Singla
