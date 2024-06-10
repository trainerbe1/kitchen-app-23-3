import routes from "../routes/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faDoorOpen, faHomeAlt, faShoppingCart, faStar, faUsers, faUtensils } from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";
import { useEffect, useState } from "react";

function Sidebar() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('info'));
        if(user.role == 'ADMIN') {
            setIsAdmin(true);
        }    
    }, []);

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {
                        !isAdmin && <>
                            <li>
                                <SidebarLink route={routes.home} icon={<FontAwesomeIcon icon={faHomeAlt} />} text={'Home'} />
                            </li>
                            <li>
                                <SidebarLink route={routes.favourites} icon={<FontAwesomeIcon icon={faStar} />} text={'Favourites'} />
                            </li>
                            <li>
                                <SidebarLink route={routes.recipes} icon={<FontAwesomeIcon icon={faBook} />} text={'Recipes'} />
                            </li>
                            <li>
                                <SidebarLink route={routes.mealPlanner} icon={<FontAwesomeIcon icon={faUtensils} />} text={'Meal Planner'} />
                            </li>
                            <li>
                                <SidebarLink route={routes.shoppingList} icon={<FontAwesomeIcon icon={faShoppingCart} />} text={'Shopping List'} />
                            </li>
                        </>
                    }

                    {
                        isAdmin && <>
                            <li>
                                <SidebarLink route={routes.userManagement} icon={<FontAwesomeIcon icon={faUsers} />} text={'Users'} />
                            </li>
                            <li>
                                <SidebarLink route={routes.recipeManagement} icon={<FontAwesomeIcon icon={faBook} />} text={'Recipes'} />
                            </li>
                        </>
                    }
                    
                    <hr />

                    <li>
                        <SidebarLink route={routes.logout} icon={<FontAwesomeIcon icon={faDoorOpen} />} text={'Logout'} />
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar
