import { useCallback, useEffect, useRef, useState } from "react";
import themes from "../common/theme";
import { getRecipes } from "../services/recipe_service";

export default function RecipeSelector({
    selectHandler
}) {
    const [inputValue, setInputValue] = useState("");
    const allRecipes = useRef([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipesData();
    }, []);

    async function getRecipesData() {
        const recipeData = await getRecipes(1, 1000);
        setRecipes(recipeData.data.data);
        allRecipes.current = recipeData.data.data;
    }

    function selectRecipe(r) {
        selectHandler(r);
    }

    function useDebounce(effect, dependencies, delay) {
        const callback = useCallback(effect, dependencies);
    
        useEffect(() => {
          const timeout = setTimeout(callback, delay);
          return () => clearTimeout(timeout);
        }, [callback, delay]);
    }

    useDebounce(
        async () => {
          try {
            if(inputValue.length === 0) {
                return setRecipes(allRecipes.current);
            }
            
            setRecipes(allRecipes.current.filter(r => r.name.toLowerCase().includes(inputValue.toLowerCase())));
          } catch (error) {
            console.error(error);
          }
        },
        [inputValue],
        500
    );

    return(
        <div>
            <div className="text-slate-400 mb-4 text-2xl">
                Select a Recipe
            </div>
            <input onChange={(e) => setInputValue(e.target.value)} type="text" className={`mb-4 ${themes.textfield}`} placeholder="Find recipe" />

            <div style={{height: '65vh'}} className="overflow-auto">
                {
                    recipes.map((r, i) => <div key={i} onClick={() => selectRecipe(r)} className="hover:bg-slate-700 flex p-1 rounded cursor-pointer">
                        <div className="p-2">
                            <img width={95} className="rounded" src={r.img_url} alt="" srcSet="" />
                        </div>
                        <div className="text-slate-400 p-2 w-full">
                            <div>{r.name}</div>
                            <div className="text-xs">Tags: {r.tags ?? '-'}</div>
                            <div className="mt-3">
                                <span className="border p-1 px-2 text-xs rounded-lg">{r.category.name}</span>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}