import { Link, Outlet } from "react-router-dom";
import Footer from '../component/Footer';
import Navbar from "../component/Navbar";

export default function layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}