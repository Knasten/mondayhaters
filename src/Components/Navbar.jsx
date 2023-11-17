import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthentication, setUser } from "../redux/auth/authSlice";
import { setItems } from "../redux/item/itemSlice";

const Navbar = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch()
  console.log('loggedIn:', loggedIn)

  const logOutHandler = async (event) => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_BASE + "auth/logout", {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok){
        dispatch(setAuthentication(false));
        dispatch(setUser(null));
        dispatch(setItems([]))
      }
    } catch (error) {
      console.error('Error during logout: ', error)
    }
  }

  return (
    <header className="bg-primary-bg flex justify-between w-full h-[80px] rounded-b-lg py-2">
      <div className="flex flex-wrap content-center ps-5" id="logo">
        <img src="./svg/wow.svg" alt="logo" />
        <h1 className="text-gold font-heading text-3xl ps-3 pt-4">The Monday Haters</h1> {/* This should be a link later on */}
      </div>
      <nav>
        <ul className="flex gap-7 pe-2 content-center flex-wrap h-full">
          <li>
            <Link className="flex gap-2" to="profile"><img src="./svg/profile.svg" alt="profile icon"/>Profile</Link>
          </li>
          <li>
          {loggedIn ? (
              <Link className="flex gap-2" to={'/'} onClick={logOutHandler}>Logout</Link>
            ) : (
              <Link className="flex gap-2" to={process.env.REACT_APP_BACKEND_BASE + 'auth'}>Login</Link>
            )}
          </li>
          <li>
            <Link className="flex gap-2" to="reservation"><img src="./svg/reservation.svg" alt="reservation icon"/>Reservation</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Navbar;