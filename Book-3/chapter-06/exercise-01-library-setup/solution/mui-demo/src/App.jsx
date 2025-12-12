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

