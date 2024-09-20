import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/recruiter/Companies'
import CompanyCreate from './components/recruiter/CompanyCreate'
import CompanySetup from './components/recruiter/CompanySetup'
import JobsRecruiter from './components/recruiter/JobsRecruiter'
import PostJobs from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import ProtectedRoute from './components/recruiter/ProtectedRoute'
import JobSetup from './components/recruiter/JobSetup'
import SavedJobs from './components/SavedJobs'
import AdminHome from './components/admin/AdminHome'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import AdminUsers from './components/admin/AdminUsers'
import AdminJobs from './components/admin/AdminJobs'
import AdminCompany from './components/admin/AdminCompanies'
import AdminHomePage from './components/admin/AdminHomePage'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription/>
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/savedJob',
    element: <SavedJobs />
  },
  {
    path: '/admin',
    element: <ProtectedAdminRoute> <AdminHome/></ProtectedAdminRoute>
  },
  {
    path: '/admin/home',
    element: <ProtectedAdminRoute> <AdminHomePage/></ProtectedAdminRoute>
  },
  {
    path: '/admin/users',
    element: <ProtectedAdminRoute> <AdminUsers/></ProtectedAdminRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedAdminRoute> <AdminJobs/></ProtectedAdminRoute>
  },
  {
    path: '/admin/company',
    element: <ProtectedAdminRoute> <AdminCompany/></ProtectedAdminRoute>
  },

  //recruiter start here

  {
    path:"/recruiter/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/recruiter/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/recruiter/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/recruiter/jobs",
    element:<ProtectedRoute><JobsRecruiter/></ProtectedRoute>
  },
  {
    path:"/recruiter/job/:id",
    element:<ProtectedRoute><JobSetup/></ProtectedRoute>
  },
  {
    path:"/recruiter/jobs/create",
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path:"/recruiter/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
