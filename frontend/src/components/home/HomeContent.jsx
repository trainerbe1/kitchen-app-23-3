import { faShoppingCart, faStar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getFavourites } from "../../services/favourite_service";
import { getShoppingLists } from "../../services/shopping_list_service";
import { getMealPlans } from "../../services/meal_planner_service";

function HomeContent() {
  const [name, setName] = useState('');
  const [spListsCount, setSPListsCount] = useState(0);
  const [mealPlansCount, setMealPlansCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('info'));
    setName(info.username);

    getData();
  }, []);

  async function getData() {
    const favData = await getFavourites();
    setFavouritesCount(favData.data.length);

    const mpData = await getMealPlans();
    setMealPlansCount(mpData.data.length);

    const spData = await getShoppingLists();
    setSPListsCount(spData.data.length);
  }

  return (
    <div className="py-3 px-2">
      <div className="text-4xl mt-6 font-bold text-white text-center">
        Welcome, {name}
      </div>

      <div className="text-xl mt-4 text-center">
        you have:
      </div>

      <center className="text-xl mt-10 text-center text-white font-semibold">
        <span className="bg-blue-400 mx-3 py-2 px-4 rounded-lg">
          <FontAwesomeIcon icon={faStar} />&nbsp;&nbsp;{favouritesCount} Favourites
        </span>
        <span className="bg-teal-400 mx-3 py-2 px-4 rounded-lg">
          <FontAwesomeIcon icon={faShoppingCart} />&nbsp;&nbsp;{spListsCount} Shopping Lists
        </span>
        <span className="bg-indigo-400 mx-3 py-2 px-4 rounded-lg">
          <FontAwesomeIcon icon={faUtensils} />&nbsp;&nbsp;{mealPlansCount} Meal Plans
        </span>
      </center>
    </div>
  );
}
  
export default HomeContent;
  