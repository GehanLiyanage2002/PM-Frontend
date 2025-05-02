import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import DashboardLayout from './pages/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import ProfileSettings from './pages/ProfileSettings'
import CreateProject from './pages/CreateProject'
import AddMembers from './pages/AddMembers'
import AddTask from './pages/AddTask'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="add-members" element={<AddMembers />} />
          <Route path="add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
