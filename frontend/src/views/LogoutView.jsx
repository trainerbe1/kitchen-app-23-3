import Lottie, { useLottie } from "lottie-react";
import logoutLottie from "../assets/lottie/logout.json";
import successLottie from "../assets/lottie/success.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import clearData from "../utils/clear_data";

function LogoutView() {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoggedOut(true);

      setTimeout(() => {
        clearData();
        navigate('/');
      }, 1500);
    }, 2000);
  }, []);

  return (
    <div className="p-10 flex flex-wrap">
      <div className="w-full text-center">
        <center>
          {
            loggedOut 
              ? <Lottie animationData={successLottie} loop={true} className="w-1/4 bg-slate-800 rounded-lg" />
              : <Lottie animationData={logoutLottie} loop={true} className="w-1/4 bg-slate-800 rounded-lg" />
          }
        </center>
      </div>
      <div className="mt-10 text-center w-full text-white text-2xl font-bold">
        {
          loggedOut 
            ? <>Success!</>
            : <>Wait, logout in process...</>
        }
      </div>
    </div>
  );
}

export default LogoutView;
