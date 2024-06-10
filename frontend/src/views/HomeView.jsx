import HomeContent from "../components/home/HomeContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function HomeView() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div className="sm:ml-64 text-slate-400">
        <div className="mt-14">
          <HomeContent />
        </div>
      </div>
    </>
  );
}
  
export default HomeView;
  