import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setItems } from './redux/item/itemSlice';

// Styling
import './App.css';

// Page Imports
import LayoutPage from './Pages/LayoutPage';
import HomePage from './Pages/HomePage';
import ReservationPage from './Pages/ReservationPage';
import ErrorPage from './Pages/ErrorPage';
import { checkAuthentication } from './redux/auth/authSlice';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'reservation', element: <ReservationPage /> },
    ]
  },
])


function App() {
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.auth.loggedIn);


  useEffect(() => {
    dispatch(checkAuthentication());
    
    const fetchData = async () => {
      if(loggedIn !== undefined && loggedIn){
        const data = await fetch(process.env.REACT_APP_BACKEND_BASE + 'items', {
          method: 'GET',
          credentials: 'include'
        });
        const itemsData = (await data.json()).message
        console.log(itemsData)
        dispatch(setItems(itemsData))
      }
    }
    fetchData()
  }, [dispatch, loggedIn])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
