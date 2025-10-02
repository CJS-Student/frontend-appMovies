import React from "react";
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light text-dark">
            <div className="container-fluid position-relative">

                <NavLink className="navbar-brand position-absolute start-0" to="/">
                    <img src="/media/logo.png" alt="Logo" style={{ height: '40px' }} />
                </NavLink>

                <div className="w-100 d-flex justify-content-center">
                    <ul className="navbar-nav d-flex flex-row gap-3">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/">Peliculas</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/generos">Generos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/directores">Directores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/tipos">Tipos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/productoras">Productoras</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}