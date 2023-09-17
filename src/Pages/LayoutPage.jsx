import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LayoutPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
};


export default LayoutPage;