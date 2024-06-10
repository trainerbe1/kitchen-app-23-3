import FavouritesContent from "../components/favourites/FavouritesContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function FavouritesView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <FavouritesContent />
        </div>
      </div>
    </>
  );
}
  
export default FavouritesView;
  