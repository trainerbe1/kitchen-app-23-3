import Navbar from "../components/Navbar";
import RecipesContent from "../components/recipes/RecipesContent";
import Sidebar from "../components/Sidebar";

function RecipesView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <RecipesContent />
        </div>
      </div>
    </>
  );
}
  
export default RecipesView;
  