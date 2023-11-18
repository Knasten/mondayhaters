import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchAndSessionStoreItems, setItems } from './redux/item/itemSlice';

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
  const selectedRaid = useSelector((state) => state.items.selectedRaid)


  useEffect(() => {
    dispatch(checkAuthentication());
    if(!sessionStorage.getItem(selectedRaid)){
      console.log('Did not find it in session')
      dispatch(fetchAndSessionStoreItems(loggedIn, selectedRaid));
    } else {
      console.log('Found it in session!')
      dispatch(setItems(JSON.parse(sessionStorage.getItem(selectedRaid))))
    }
  }, [dispatch, loggedIn, selectedRaid])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
