import { faAdd, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getRecipes, deleteRecipeById } from "../../../services/recipe_service";
import ReactModal from "react-modal";
import themes from "../../../common/theme";
import Confirm from "../../Confirm";

function CreateRecipeContent() {
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([]);

  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  function addIngredient(e) {
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
            <input type="text" className={`${themes.textfield}`} placeholder="Chicken Curry..." />
          </div>

        </div>

        <div className="p-4 border-l w-1/2">
          <div className="mb-4">
            <div className="text-white mb-2">Ingredients:</div>
            <form onSubmit={addIngredient}>
              <input value={ingredient} onChange={(e) => setIngredient(e.target.value)} placeholder="1 tbs sugar (enter to add)" className={themes.textfield} />
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
    </div>
  );
}
  
export default CreateRecipeContent
  