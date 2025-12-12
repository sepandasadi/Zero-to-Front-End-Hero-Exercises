# Material UI (MUI) - Complete Example

## Setup

```bash
npm create vite@latest mui-demo -- --template react
cd mui-demo
npm install
npm install @mui/material @emotion/react @emotion/styled
```

## Complete Implementation

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

### `src/App.jsx`

```jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Checkbox,
  FormControlLabel,
  Box,
  Stack,
} from '@mui/material'
import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    terms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Form submitted! Check console.')
  }

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI Demo
          </Typography>
          <Button color="inherit" href="#home">Home</Button>
          <Button color="inherit" href="#about">About</Button>
          <Button color="inherit" href="#contact">Contact</Button>
          <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Material UI
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Material UI is a comprehensive React component library that implements
          Google's Material Design. It provides a robust set of components to
          build beautiful, accessible UIs quickly.
        </Typography>

        {/* Card Example */}
        <Card sx={{ mt: 4, mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Feature Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a Material UI Card component. Cards are versatile containers
              for displaying related information. They can contain images, text,
              actions, and more.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary">
              Learn More
            </Button>
            <Button size="small">Share</Button>
          </CardActions>
        </Card>

        {/* Form Section */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          Contact Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <FormControl fullWidth>
              <FormLabel>Country</FormLabel>
              <Select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select a country</em>
                </MenuItem>
                <MenuItem value="usa">United States</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="canada">Canada</MenuItem>
                <MenuItem value="australia">Australia</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  required
                />
              }
              label="I accept the terms and conditions"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default App
```

##package.json

```json
{
  "name": "mui-demo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.14.20",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

## What You've Built

✅ **AppBar with Navigation** - Header with logo and nav links
✅ **Buttons** - Various styles and colors
✅ **Card Component** - Content container with actions
✅ **Form Elements** - Text inputs, select, checkbox
✅ **Layout System** - Container and responsive grid
✅ **Typography** - Consistent text styles
✅ **Theme Integration** - Custom colors applied

## Key MUI Concepts

### 1. ThemeProvider
Wraps your app to provide theme context:
```jsx
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
```

### 2. Style Props (`sx` prop)
Inline styles with theme access:
```jsx
<Box sx={{ mt: 4, p: 2, bgcolor: 'primary.main' }}>
```

### 3. Variants
Components have different visual styles:
```jsx
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
```

### 4. Responsive Design
Built-in breakpoints:
```jsx
<Container maxWidth="md"> {/* Responsive width */}
<Grid item xs={12} md={6}> {/* Responsive columns */}
```

## Developer Experience Notes

**Pros:**
- ⭐ Comprehensive component library
- ⭐ Excellent TypeScript support
- ⭐ Great documentation
- ⭐ Active community
- ⭐ Enterprise-ready

**Cons:**
- ⚠️ Bundle size can be large
- ⚠️ Learning curve for customization
- ⚠️ Strong opinions on design

## Next Steps

1. Try customizing the theme
2. Add more components (Dialog, Drawer, Tabs)
3. Implement dark mode
4. Add form validation
5. Explore advanced layouts with Grid

---

**You've successfully set up Material UI!** 🎉

