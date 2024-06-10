import Navbar from "../components/Navbar";
import ShoppingListContent from "../components/shopping-list/ShoppingListContent";
import Sidebar from "../components/Sidebar";

function ShoppingListView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <ShoppingListContent />
        </div>
      </div>
    </>
  );
}
  
export default ShoppingListView;
  