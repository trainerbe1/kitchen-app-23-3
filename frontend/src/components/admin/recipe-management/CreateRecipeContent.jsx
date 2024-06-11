import { faAdd, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getRecipes, deleteRecipeById, addRecipe } from "../../../services/recipe_service";
import ReactModal from "react-modal";
import themes from "../../../common/theme";
import Confirm from "../../Confirm";
import { getAreas } from "../../../services/area_service";
import { getCategories } from "../../../services/category_service";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/routes";

function CreateRecipeContent() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    ingredient: null,
    instructions: null
  });

  const tags = useRef('');
  const img = useRef('');
  const name = useRef('');
  const video = useRef('');

  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);

  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAreaData();
    getCategoryData();
  }, []);

  async function getAreaData() {
    const data = await getAreas();
    setAreas(data.data.map(d => ({value: d.id, label: d.name})));
  }
  
  async function getCategoryData() {
    const data = await getCategories();
    setCategories(data.data.map(d => ({value: d.id, label: d.name})));
  }

  function addIngredient(e) {
    e.stopPropagation();
    e.preventDefault();

    setIngredients([
      ...ingredients,
      ingredient
    ]);
    setIngredient('');
  }
  
  function addInstruction(e) {
    e.preventDefault();

    setInstructions([
      ...instructions,
      instruction
    ]);
    setInstruction('');
  }

  async function submit(e) {
    setErrors({});

    if(ingredients.length === 0) {
      setErrors({
        ingredient: 'Ingredients Must Not Empty'
      });
      return;
    } else if(instructions.length === 0) {
      setErrors({
        instructions: 'Instructions Must Not Empty'
      });
      return;
    } else if(name.current.value.length === 0) {
      setErrors({
        name: 'Name Must Not Empty'
      });
      return;
    } else if(img.current.value.length === 0) {
      setErrors({
        img_url: 'Image Must Not Empty'
      });
      return;
    } else if(video.current.value.length === 0) {
      setErrors({
        video_url: 'Video Must Not Empty'
      });
      return;
    } else if(!selectedArea) {
      setErrors({
        area_id: 'Area Must Not Empty'
      });
      return;
    } else if(!selectedCategory) {
      setErrors({
        category_id: 'Category Must Not Empty'
      });
      return;
    }

    await addRecipe({
      "img_url": img.current.value,
      "ingredient": ingredients.join('\n'),
      "instructions": instructions.join('\n'),
      "name": name.current.value,
      "video_url": video.current.value,
      "area_id": selectedArea.value,
      "category_id": selectedCategory.value,
      "tags": tags.current.value
    });
    toast.success('Recipe Added Successfully');
    navigate(routes.recipeManagement);
  }

  return (
    <div>
      <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky flex">
        <div className='w-28 px-3 text-left'><button onClick={() => history.back()} type='button'><FontAwesomeIcon width={15} icon={faLongArrowAltLeft} />&nbsp;&nbsp;Back</button></div>
        <div className="w-full text-center">New Recipe</div>
        <div className='w-28 px-3 text-left'></div>
      </div>

      <div className="p-2 flex">
        <div className="p-4 border-r w-1/2">

          <div className="mb-4">
            <div className="text-white mb-2">Name:</div>
            <input required ref={name} type="text" className={`${themes.textfield}`} placeholder="Chicken Curry..." />
            <div className="mt-1 text-red-400 text-xs">
              {errors.name}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-white mb-2">Video Url:</div>
            <input required ref={video} type="text" className={`${themes.textfield}`} placeholder="https://..." />
            <div className="mt-1 text-red-400 text-xs">
              {errors.video_url}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-white mb-2">Image Url:</div>
            <input required ref={img} type="text" className={`${themes.textfield}`} placeholder="https://..." />
            <div className="mt-1 text-red-400 text-xs">
              {errors.img_url}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-white mb-2">Tags:</div>
            <input ref={tags} type="text" className={`${themes.textfield}`} placeholder="Baking,Fruity,Tart" />
          </div>
          
          <div className="mb-4">
            <div className="text-white mb-2">Area:</div>
            <ReactSelect
              required
              styles={themes.selectDropdown}
              value={selectedArea}
              onChange={(e) => setSelectedArea(e)}
              options={areas}
            />
            <div className="mt-1 text-red-400 text-xs">
              {errors.area_id}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-white mb-2">Category:</div>
            <ReactSelect
              required
              styles={themes.selectDropdown}
              className="text-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e)}
              options={categories}
            />
            <div className="mt-1 text-red-400 text-xs">
              {errors.category_id}
            </div>
          </div>

        </div>

        <div className="p-4 border-l w-1/2">
          <div className="mb-4">
            <div className="text-white mb-2">Ingredients:</div>
            <form onSubmit={addIngredient}>
              <input value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="1 tbs sugar (enter to add)" className={themes.textfield} />
              <div className="mt-1 text-red-400 text-xs">
                {errors.ingredient}
              </div>
            </form>

            <div className="px-4 py-1 mt-1">
              <ul className="list-decimal">
                {
                  ingredients.map((i, idx) => <li className="mb-2" key={idx}>{i}</li>)
                }
              </ul>
            </div>
          </div>

          <hr className="my-4" />

          <div className="mb-4">
            <div className="text-white mb-2">Instructions:</div>
            <form onSubmit={addInstruction}>
              <input value={instruction} onChange={(e) => setInstruction(e.target.value)} placeholder="Cut the onions (enter to add)" className={themes.textfield} />
              <div className="mt-1 text-red-400 text-xs">
                {errors.instructions}
              </div>
            </form>

            <div className="px-4 py-1 mt-1">
              <ul className="list-decimal">
                {
                  instructions.map((i, idx) => <li className="mb-2" key={idx}>{i}</li>)
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-10 text-right">
        <button type="button" onClick={submit} className="py-1 px-4 rounded text-white bg-blue-500 hover:bg-slate-800">Submit</button>
      </div>
    </div>
  );
}
  
export default CreateRecipeContent
  