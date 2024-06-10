import RecipeManagementContent from "../components/admin/recipe-management/RecipeManagementContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function RecipeManagementView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <RecipeManagementContent />
        </div>
      </div>
    </>
  );
}
  
export default RecipeManagementView;
  