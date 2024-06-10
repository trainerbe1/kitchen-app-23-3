import app from "../common/app";

const routes = {
    main: app.baseUrl,
    register: "/register",
    home: "/home",
    shoppingList: "/shopping-list",
    mealPlanner: "/meal-planner",
    favourites: "/favourites",
    recipes: "/recipes",
    recipeDetail(id = null) {
        return `/recipes/${id ?? ':id'}`
    },
    
    userManagement: "/user-management",
    
    createRecipe: "/recipe-management/create",
    recipeManagement: "/recipe-management",

    logout: "/logout",
};

export default routes;