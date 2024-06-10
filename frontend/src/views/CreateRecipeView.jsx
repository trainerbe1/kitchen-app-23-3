import CreateRecipeContent from "../components/admin/recipe-management/CreateRecipeContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CreateRecipeView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <CreateRecipeContent />
        </div>
      </div>
    </>
  );
}
  
export default CreateRecipeView;
  