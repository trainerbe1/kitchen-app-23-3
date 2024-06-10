import { useEffect, useRef, useState } from 'react';
import { getRecipeById } from "../../services/recipe_service";
import { useParams } from 'react-router-dom';
import getEmbedYTUrl from '../../utils/get_embed_yt_url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faHand, faHeart as faHeart2, faLongArrowAltLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import routes from "../../routes/routes";
import { addFavourite, deleteFavourite } from "../../services/favourite_service";
import { toast } from 'react-toastify';

function RecipeDetailContent() {
  const userId = useRef(JSON.parse(localStorage.getItem('info')).id);
  const params= useParams();
  const [recipe, setRecipe] = useState({
    id: 0,
    name: '',
    img_url: '',
    video_url: '',
    area: {
      name
    },
    category: {
      name
    },
    tags: '',
    ingredient: '',
    instructions: '',
    favourites: []
  });

  useEffect(() => {
    getRecipeData();
  }, []);

  async function getRecipeData() {
    const data = await getRecipeById(params.id);
    setRecipe(data.data);
  }

  async function setToFavourite() {
    const isFavourite = recipe.favourites.find(f => f.user_id === userId.current);

    if(!isFavourite) {
      const newRecipe = await addFavourite(recipe.id);
      toast.success('Recipe added to favourites');
      setRecipe(newRecipe.data.recipe);
    } else {
      const newRecipe = await deleteFavourite(isFavourite.id);
      toast.success('Recipe deleted from favourites');
      setRecipe({
        ...newRecipe.data.recipe,
        favourites: newRecipe.data.recipe.favourites.filter(f => f.user_id != userId.current)
      });
    }
  }

  return (
    <div>
      <div className="p-3 flex dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
        <div className='w-28 px-3 text-left'><button onClick={() => history.back()} type='button'><FontAwesomeIcon width={15} icon={faLongArrowAltLeft} />&nbsp;&nbsp;Back</button></div>
        <div className='w-full'>
          How to make {recipe.name ?? 'Loading...'}&emsp;
          <button type='button' onClick={setToFavourite}>
            {
              recipe.favourites.some(f => f.user_id == userId.current) 
                ? <FontAwesomeIcon width={15} icon={faHeart2} />
                : <FontAwesomeIcon width={15} icon={faHeart} />
            }
          </button>
        </div>
        <div className='w-28'></div>
      </div>

      <div className='p-4 flex'>
        <div className='p-3 w-3/6'>
          <div className='text-2xl font-bold text-white'>Overview</div>
          <hr className='my-3'/>

          <div className='mt-5'>
            <FontAwesomeIcon width={15} icon={faTags} /> {recipe.tags ?? '-'}
          </div>
          <div className='mt-3'>
            <FontAwesomeIcon width={15} icon={faHand} /> {recipe.instructions.split('\n').length} Steps
          </div>
          <div className='mt-3'>
            <FontAwesomeIcon width={15} icon={faCarrot} /> {recipe.ingredient.split('\n').length} Ingredients
          </div>
          <div className='mt-3'>
            <FontAwesomeIcon width={15} icon={faLayerGroup} /> {recipe.category.name}
          </div>
          <div className='mt-3'>
            <FontAwesomeIcon width={15} icon={faMapMarkerAlt} /> {recipe.area.name}
          </div>
          <div className='mt-3'>
            <FontAwesomeIcon width={15} icon={faHeart2} /> {recipe.favourites.length} Favourites
          </div>
        </div>

        <div className='p-3 w-3/6'>
          <iframe className='w-full' height="350" src={getEmbedYTUrl(recipe.video_url)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

      </div>

      <div className='my-4 flex'>
        <div className='w-1/2 p-3'>
          <div className='text-2xl font-bold text-white'>Ingredients</div>
          <hr className='my-4' />
          <div className='px-5'>
            <ol className='list-decimal'>
              {
                recipe.ingredient.split('\n').map((i, idx) => <li className='mb-3' key={idx}>{i}</li>)
              }
            </ol>
          </div>
        </div>    

        <div className='w-1/2 p-3'>
          <div className='text-2xl font-bold text-white'>Instructions</div>
          <hr className='my-4' />
          <div className='px-5'>
            <ol className='list-decimal'>
              {
                recipe.instructions.split('\n').map((i, idx) => <li className='mb-3' key={idx}>{i}</li>)
              }
            </ol>
          </div>
        </div>    
      </div>
    </div>
  );
}

export default RecipeDetailContent;