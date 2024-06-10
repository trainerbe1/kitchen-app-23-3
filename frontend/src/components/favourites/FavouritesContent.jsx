import themes from '../../common/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faMapMarkerAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { getFavourites } from "../../services/favourite_service";
import EmptyCart from "../../assets/svg/empty_cart.svg";
import routes from '../../routes/routes';

function FavouritesContent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipeData();
  }, []);

  async function getRecipeData(page = 1) {
    const data = await getFavourites(page);
    setRecipes(data.data);
  }

  return (
    <div>
      <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
        All Favourites
      </div>

      <div className='p-4'>
        <div className='flex flex-wrap mt-4'>
          {
            recipes.map((r, i) => 
              <a href={routes.recipeDetail(r.recipe.id)} key={i} className="w-1/3 p-2">
                <div className='rounded border cursor-pointer p-2 flex hover:bg-slate-800 text-left'>
                  <div>
                    <img width={150} className='rounded' src={r.recipe.img_url} alt="" />
                  </div>

                  <div className='w-full ml-4'>
                    <div className='font-bold text-white text-2xl'>
                      {r.recipe.name}
                    </div>

                    <div className='mt-3 text-sm'>
                    <FontAwesomeIcon width={15} icon={faLayerGroup} /> {r.recipe.category.name}
                    </div>

                    <div className='mt-1 text-sm'>
                      <FontAwesomeIcon width={15} icon={faMapMarkerAlt} /> {r.recipe.area.name}
                    </div>
                    
                    <div className='mt-1 text-sm'>
                      <FontAwesomeIcon width={15} icon={faTags} /> {r.recipe.tags ?? '-'}
                    </div>
                </div>
                </div>
              </a>
            )
          }
        </div>

        {
          recipes.length === 0 && <center className='mt-4'>
            <img width={400} className='rounded p-5 bg-slate-700' src={EmptyCart} alt="" srcSet="" />
            <div className='font-bold mt-3 text-2xl text-white'>No Recipes Found</div>
          </center>
        }
      </div>
    </div>
  );
}
  
export default FavouritesContent;
  