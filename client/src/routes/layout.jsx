import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from '../component/Footer';
import Navbar from "../component/Navbar";

let GAMES;

export default function Layout() {
  const [ games, setGames ] = useOutletContext()
  return (
    <div>
      <Navbar />
      <Outlet context={[games, setGames]} />
      <Footer />
    </div>
  )
}