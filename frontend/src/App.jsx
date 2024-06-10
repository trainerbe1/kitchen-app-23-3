import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import app from './common/app';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('info');
    const token = localStorage.getItem('accessToken');

    if (token != null && (!userInfo && location.pathname.length !== 1 && location.pathname != app.baseUrl)) {
      location.href = '/';
    } else {
      if(userInfo) {
        const payload = JSON.parse(userInfo);
        
        if(location.pathname.split('/')[1] === 'admin' && payload.role !== 'ADMIN') {
          location.href = '/home';
        } else if(location.pathname.split('/')[1] === '') {
          if(payload.role === 'USER') {
            location.href = '/home';
          } else {
            location.href = '/user-management';
          }
        } 
      }
      
      setLoading(false);
    }
  }, []);

  if(loading) {
    return null;
  }

  return (
    <>
      <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName={'dark:bg-gray-700 bg-white text-white font-semibold'}
        style={{ width: '35%' }}
        closeButton={<div className='my-auto mx-3'><FontAwesomeIcon icon={faX} className='text-sm' title='Close' /></div>}
      />

      <RouterProvider router={router} />
    </>
  );
}

export default App
