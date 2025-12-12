# Chakra UI - Complete Example

## Setup

```bash
npm create vite@latest chakra-demo -- --template react
cd chakra-demo
npm install
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## Complete Implementation

### `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
```

### `src/App.jsx`

```jsx
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Select,
  Checkbox,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Spacer,
} from '@chakra-ui/react'
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
      <Box bg="blue.500" color="white" px={4} py={3}>
        <Flex maxW="container.xl" mx="auto" align="center">
          <Heading size="md">Chakra Demo</Heading>
          <Spacer />
          <HStack spacing={4}>
            <Button variant="ghost" colorScheme="whiteAlpha">Home</Button>
            <Button variant="ghost" colorScheme="whiteAlpha">About</Button>
            <Button variant="ghost" colorScheme="whiteAlpha">Contact</Button>
            <Button colorScheme="pink">Get Started</Button>
          </HStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container maxW="container.md" py={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Chakra UI
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Chakra UI is a simple, modular and accessible component library that
          gives you the building blocks to build React applications with speed.
        </Text>

        {/* Card Example */}
        <Card mb={8}>
          <CardHeader>
            <Heading size="md">Feature Card</Heading>
          </CardHeader>
          <CardBody>
            <Text color="gray.600">
              This is a Chakra UI Card component. Chakra makes it easy to create
              beautiful, responsive UIs with its intuitive style props and
              component API.
            </Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme="blue" mr={3}>Learn More</Button>
            <Button variant="ghost">Share</Button>
          </CardFooter>
        </Card>

        {/* Form Section */}
        <Heading as="h2" size="xl" mb={6} mt={12}>
          Contact Form
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select a country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </Select>
            </FormControl>

            <Checkbox
              isChecked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              isRequired
            >
              I accept the terms and conditions
            </Checkbox>

            <Button type="submit" colorScheme="blue" size="lg" width="full">
              Submit
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default App
```

## Key Chakra Concepts

### 1. Style Props
The best feature of Chakra - style directly via props:
```jsx
<Box bg="blue.500" p={4} borderRadius="md" boxShadow="lg">
  Content
</Box>
```

### 2. Color Schemes
Pre-defined color palettes:
```jsx
<Button colorScheme="blue">Button</Button>
// Generates blue.500, blue.600 on hover, etc.
```

### 3. Responsive Values
Array/object syntax for breakpoints:
```jsx
<Box
  width={{ base: '100%', md: '50%', lg: '33%' }}
  fontSize={['sm', 'md', 'lg']}
>
```

### 4. Composition
Build complex UIs with simple components:
```jsx
<VStack spacing={4}>  {/* Vertical stack with spacing */}
  <HStack>           {/* Horizontal stack */}
    <Box />
    <Box />
  </HStack>
</VStack>
```

## Developer Experience Notes

**Pros:**
- ⭐⭐⭐ Best developer experience
- ⭐⭐⭐ Intuitive style props
- ⭐⭐ Excellent accessibility
- ⭐⭐ Fast to build with
- ⭐ Built-in dark mode support

**Cons:**
- ⚠️ Smaller ecosystem than MUI
- ⚠️ Less enterprise adoption

**Perfect for:**
- Startups
- MVPs
- Developer happiness
- Rapid prototyping

---

**Chakra UI: The fastest way to build beautiful React apps!** ⚡

