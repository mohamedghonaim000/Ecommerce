import React, { useContext } from "react";
import logo from "../src/assets/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Home from './Home';
import Products from './Products';
import Categoris from './Categoris';
import { auth } from './Context/AuthContext';

export default function Navbar() {
  let { setLogin,isLogin } = useContext(auth);
  let naviegate=useNavigate()

  function logOut(){
    localStorage.removeItem('userToken')
    setLogin(null)
    naviegate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              <li className="nav-item px-2">
                <NavLink to={'/home'}>Home</NavLink>
              </li>
              
              <li className="nav-item px-2">
                <NavLink to={'/Products'}>Products</NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to={'/Categoris'}>Categories</NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to={'/brand'}>Brand</NavLink>
              </li>
            </ul>
            <div className="logo">
              {isLogin?<ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                <li className="nav-item px-2">
                <NavLink to={'/cart'}><i className="fa-solid fa-cart-shopping text-success"></i></NavLink>
              </li>
                <li className="nav-item px-2 cursor-pointer" onClick={logOut}>
                  LogOut {isLogin?<span className="px-2 text-success font-bold">Hi {isLogin.name}</span>:""}
                </li>
              </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                <li className="nav-item">
                  <a href="">
                    <i className="fa-brands fa-instagram px-2"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-facebook px-2"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-tiktok px-2"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-twitter px-2"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-linkedin px-2"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-youtube px-2"></i>
                  </a>
                </li>
                <li className="nav-item px-2">
                  <NavLink to={"/login"}>login</NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink to={"/register"}>sign up</NavLink>
                </li>
              </ul>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
