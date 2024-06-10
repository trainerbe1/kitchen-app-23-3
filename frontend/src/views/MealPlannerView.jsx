import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MealPlannerContent from "../components/meal-planner/MealPlannerContent";

function MealPlannerView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <MealPlannerContent />
        </div>
      </div>
    </>
  );
}
  
export default MealPlannerView;
  