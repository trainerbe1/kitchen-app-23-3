import Navbar from "../components/Navbar";
import RecipeDetailContent from "../components/recipes/RecipeDetailContent";
import Sidebar from "../components/Sidebar";

function RecipeDetailView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <RecipeDetailContent />
        </div>
      </div>
    </>
  );
}
  
export default RecipeDetailView;
  