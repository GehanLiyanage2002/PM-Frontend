import {
  Box,
  Flex,
  Heading,
  IconButton,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import { FaUserCircle, FaPlus, FaUsers, FaTasks, FaTachometerAlt } from 'react-icons/fa'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Create Project', icon: <FaPlus />, path: '/dashboard/create-project' },
    { name: 'Add Members', icon: <FaUsers />, path: '/dashboard/add-members' },
    { name: 'Add Task', icon: <FaTasks />, path: '/dashboard/add-task' },
  ]

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w="240px"
        bg="gray.800"
        color="white"
        p={5}
        position="fixed"
        top="0"
        left="0"
        minH="100vh"
      >
        <Heading size="md" mb={8}>Control Panel</Heading>
        <VStack spacing={4} align="stretch">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'} 
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '6px',
                backgroundColor: isActive ? '#2D3748' : 'transparent',
                color: isActive ? '#90CDF4' : '#CBD5E0',
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: 'none',
              })}
            >
              <Box mr={3}>{item.icon}</Box>
              {item.name}
            </NavLink>
          ))}
        </VStack>
      </Box>

      {/* Main area */}
      <Box ml="240px" flex="1" bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
        {/* Top Navbar */}
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding={4}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="sm"
        >
          <Heading size="md" color="blue.600">
            Uva Project Management System
          </Heading>

          <Flex align="center" gap={4}>
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon />}
              variant="ghost"
              fontSize="xl"
            />

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Profile"
                icon={<FaUserCircle />}
                variant="ghost"
                fontSize="xl"
              />
              <MenuList>
                <MenuItem onClick={() => navigate('/profile-settings')}>
                  Profile Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {/* Page Content */}
        <Box p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  )
}

export default Dashboard
