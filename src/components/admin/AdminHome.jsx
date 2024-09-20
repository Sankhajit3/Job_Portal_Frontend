import AdminCompany from "./AdminCompanies"
import AdminJobs from "./AdminJobs"
import AdminUsers from "./AdminUsers"
import Sidebar from "./Sidebar"

const AdminHome = () => {
  return (
    <div>
        <Sidebar/>
        <AdminUsers/>
        <AdminJobs/>
        <AdminCompany/>
    </div>
  )
}

export default AdminHome