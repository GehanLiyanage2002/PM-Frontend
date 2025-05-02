import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email.endsWith('@std.uwu.ac.lk')) {
      setError('Only Uva Wellassa University emails are allowed.')
      return
    }

    try {
      const res = await fetch('http://localhost/uva-pms-backend/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.message || 'Registration failed.')
      }
    } catch (err) {
      setError('Server error. Please try again later.')
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={4} textAlign="center">Uva Project Management System</Heading>
      <Text fontSize="sm" color="gray.600" textAlign="center" mb={6}>
        This system can be used to manage your 2nd year and final year projects.
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input name="name" onChange={handleChange} autoComplete="name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>University Email</FormLabel>
            <Input name="email" type="email" onChange={handleChange} autoComplete="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="blue" type="submit" width="full">
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Register
