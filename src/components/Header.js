import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import { signout, isAuth } from '../actions/auth'
import Router from 'next/router'
import NProgress from "nprogress";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import '.././node_modules/nprogress/nprogress.css'
import Search from './blog/Search'

import { FaNewspaper, FaPenToSquare } from "react-icons/fa6";
import { FaPowerOff, FaSignInAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";



Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()


const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <div id="nav">
        <Link legacyBehavior href="/">
          <a id="logo">WEBBLOG</a>
        </Link>
        <div className="menu-container" >
          <Link legacyBehavior href="/blogs" passHref>
            <a id="menulink" title="Blogs"  ><FaNewspaper/></a >
          </Link>
          <Link legacyBehavior href="/user/crud/blog" passHref>
            <a id="menulink" title="create a blog"><FaPenToSquare/></a >
          </Link>
          {!isAuth() && (
            <>
              <Link legacyBehavior href="/signin" passHref>
                <a id="menulink" title="signIn" href="/signup" className="" ><PiSignInBold /></a >
              </Link>
              <Link legacyBehavior href="/signup" passHref>
                <a id="menulink" title="signUp" href="/signup"><FaUserPlus/></a>
              </Link>
            </>
          )}

          {isAuth() && (
            <>
              <Link legacyBehavior href={isAuth().role === 1 ? "/admin" : "/user"} passHref>
                <a id="menulink" title={`${isAuth().name}`} href={isAuth().role === 1 ? "/admin" : "/user"}>
                  <FaUser/>
                </a >
              </Link>
              <Link legacyBehavior href="/signin" passHref>
                <a id="menulink" title="signOut" onClick={() => signOut(() => Router.push("/signin"))}>
                  <FaPowerOff/>
                </a>
              </Link>
            </>
          )}
        </div>
      </div>
      <Search />
    </>
  );
};

export default Header;
