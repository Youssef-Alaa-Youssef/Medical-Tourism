import React from "react";
import Footer from "../Footer/footer";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function Master({ realData, logOut }) {
    return (
        <>
            <NavBar realData={realData} logOut={logOut} />
            <Outlet></Outlet>
            <Footer />
        </>
    );
}