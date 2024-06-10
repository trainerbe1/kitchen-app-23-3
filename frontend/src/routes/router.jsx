import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import AuthView from "../views/AuthView";
import HomeView from "../views/HomeView";
import ShoppingListView from "../views/ShoppingListView";
import MealPlannerView from "../views/MealPlannerView";
import FavouritesView from "../views/FavouritesView";
import RecipesView from "../views/RecipesView";
import LogoutView from "../views/LogoutView";
import RecipeManagementView from "../views/RecipeManagementView";
import UserManagementView from "../views/UserManagementView";
import RecipeDetailView from "../views/RecipeDetailView";
import CreateRecipeView from "../views/CreateRecipeView";
import RegisterView from "../views/RegisterView";

const router = createBrowserRouter([
    {
        path: routes.main,
        element: <AuthView />
    },
    {
        path: routes.register,
        element: <RegisterView />
    },
    {
        path: routes.home,
        element: <HomeView />
    },
    {
        path: routes.shoppingList,
        element: <ShoppingListView />
    },
    {
        path: routes.mealPlanner,
        element: <MealPlannerView />
    },
    {
        path: routes.recipes,
        element: <RecipesView />,
    },
    {
        path: routes.recipeDetail(),
        element: <RecipeDetailView />
    },
    {
        path: routes.favourites,
        element: <FavouritesView />
    },

    {
        path: routes.userManagement,
        element: <UserManagementView />
    },
    {
        path: routes.recipeManagement,
        element: <RecipeManagementView />
    },
    {
        path: routes.createRecipe,
        element: <CreateRecipeView />
    },

    {
        path: routes.logout,
        element: <LogoutView />
    },
]);

export default router;