# Country Explorer

A modern web application built with React that allows users to explore countries and their details. The application features a responsive design, dark mode support, and a seamless user experience.

## Features

- 🌍 Browse all countries with a modern card-based interface
- 🔍 Search countries by name
- 🏷️ Filter countries by region
- 🌓 Dark mode support with system preference detection
- 📱 Fully responsive design
- ⚡ Smooth animations and transitions
- 🔄 Loading skeletons for better UX

## Technologies Used

- React 18
- React Router v6
- Tailwind CSS
- REST Countries API
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/country-explorer.git
   cd country-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` folder.

## API Integration

The application uses the [REST Countries API](https://restcountries.com/) to fetch country data. The API endpoints used are:

- `/v3.1/all` - Get all countries
- `/v3.1/name/{name}` - Search countries by name
- `/v3.1/region/{region}` - Filter countries by region
- `/v3.1/alpha/{code}` - Get country by code (used for border countries)

### API Implementation

The API calls are centralized in `src/services/api.js` with the following functions:

- `getAllCountries()`
- `getCountryByName(name)`
- `getCountriesByRegion(region)`
- `getCountryByCode(code)`

## Challenges and Solutions

### 1. API Response Handling

**Challenge**: The API sometimes returns different data structures for different endpoints.

**Solution**: Implemented robust error handling and data normalization to ensure consistent data structure throughout the application.

### 2. Dark Mode Implementation

**Challenge**: Ensuring smooth transitions between themes and persisting user preferences.

**Solution**: Created a ThemeContext using React Context API and localStorage for persistence. Used Tailwind's dark mode utility for seamless theme switching.

### 3. Loading States

**Challenge**: Initial loading states caused layout shifts and poor user experience.

**Solution**: Implemented skeleton loading components that match the exact dimensions and layout of the actual content, preventing layout shifts.

### 4. Performance Optimization

**Challenge**: Loading large amounts of country data and images efficiently.

**Solution**:

- Implemented lazy loading for images
- Added pagination for country list (future enhancement)
- Optimized API calls with proper error handling and loading states


```
