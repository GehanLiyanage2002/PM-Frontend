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

function Login() {
  const [formData, setFormData] = useState({
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

    try {
      const res = await fetch('http://localhost/PM-Backend/PM-backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result))
        navigate('/dashboard')
      } else {
        setError(result.message || 'Login failed.')
      }
    } catch (err) {
      setError('Server error. Please try again later.')
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={4} textAlign="center">Uva Project Management System</Heading>
      <Text fontSize="sm" color="gray.600" textAlign="center" mb={6}>
        Please log in with your Uva Wellassa University email.
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>University Email</FormLabel>
            <Input name="email" type="email" onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" onChange={handleChange} />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="green" type="submit" width="full">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Login
