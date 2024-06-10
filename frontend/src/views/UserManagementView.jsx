import UserManagementContent from "../components/admin/user-management/UserManagementContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UserManagementView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <UserManagementContent />
        </div>
      </div>
    </>
  );
}
  
export default UserManagementView;
  