import { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export default function GameProvider() {
   
let games = useLoaderData()
    return (
        <div>
            <Outlet context={[games]} />
        </div>
    );
}