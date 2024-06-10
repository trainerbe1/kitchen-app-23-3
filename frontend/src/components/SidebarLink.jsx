import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function SidebarLink({
    icon,
    route,
    text,
}) {
    const location = useLocation();    
    const [path, setPath] = useState('');

    useEffect(() => {
        setPath(location.pathname);
    }, []);

    return (
        <Link className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${path == route || `/${path.split('/')[1]}` == route ? 'bg-gray-600' : ''}`} to={route}>
            { icon }
            <span className="ms-3">{ text }</span>
        </Link>
    );
  }
  
  export default SidebarLink
  