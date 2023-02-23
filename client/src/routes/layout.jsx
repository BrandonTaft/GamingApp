import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from '../component/Footer';
import Navbar from "../component/Navbar";



export default function Layout() {
  const [ games ] = useOutletContext()
  return (
    <div>
      <Navbar />
      <div className="content">
      <Outlet context={[games]} />
      </div>
      <Footer />
    </div>
  )
}