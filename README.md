# Hello Factory

AI Software Factory - World Clock with Excel Configuration

Built with Figma Make + React + Vite + Tailwind CSS

## Features

- **3 World Clocks**: Main clock (center) + 2 configurable clocks (bottom)
- **Excel Configuration**: Upload Excel file to change which cities to display
- **10 Cities Supported**: Bangkok (TH), New York (US), London (UK), Tokyo (JP), Shanghai (CN), Singapore (SG), Sydney (AU), Berlin (DE), Paris (FR), Dubai (AE)
- **Real-time Updates**: Accurate IANA timezone integration
- **Country Flags**: Visual indicators via flagcdn.com
- **Elegant Design**: Glassmorphism with purple gradient theme
- **Smooth Animations**: Motion-powered transitions

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Excel Configuration

Download the template: `hello-factory-config-template.csv`

Format:
```csv
clock1,clock2,clock3
TH,US,UK
```

Available city codes: TH, US, UK, JP, CN, SG, AU, DE, FR, AE

Upload via the "Upload Config" button in the top-right corner.

## Tech Stack

- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **Animation**: Motion (Framer Motion)
- **Excel Parsing**: xlsx 0.18.5
- **Timezone**: date-fns-tz 3.2.0
- **UI Components**: shadcn/ui

## Architecture

Part of the AI Software Factory concept - demonstrating the "Excel → AI → Database → Display" pipeline on GCP.

**Vibe Coding**: 90% AI execution + 10% human direction

Built with Claude AI in Figma Make.
