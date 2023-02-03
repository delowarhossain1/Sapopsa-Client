import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../../images/sapopsa.png";
import close from "../../../images/close.svg";
import search from "../../../icons/search.png";
import userIcon from "../../../icons/user.png";
import bag from "../../../icons/bag.png";
import { AiOutlineLogin } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { getProducts } from "../../../utilites/addToCard";

const Navbar = ({ refetch }) => {
    const [user] = useAuthState(auth);
    const [categories, setCategories] = useState({});
    const [addToCardProducts, setaddToCardProducts] = useState(0);
    const [webHeading, setWebHeading] = useState({ heading: '', isDispaly: false });

    const [toggleClass, setToggleClass] = useState(false);
    const mediaSize = 991;

    // Get add to card products
    useEffect(() => {
        const products = getProducts();
        setaddToCardProducts(products?.length);
    }, [refetch]);

    // Get web heading
    useEffect(() => {
        fetch('http://localhost:5000/web-heading')
            .then(res => res.json())
            .then(res => setWebHeading(res))
            .catch(err => console.log(err));
    }, []);

    // Get cagories
    useEffect(() => {
        const url = `http://localhost:5000/categories-list`;
        fetch(url)
            .then(res => res.json())
            .then(res => setCategories(res));
    }, [])


    const toggleNav = () => {
        setToggleClass(!toggleClass);
    }

    const navMenu = (event) => {
        if (event.target.hasAttribute("data-toggle") &&
            window.innerWidth <= mediaSize) {
            // prevent default anchor click behavior
            event.preventDefault();
            const menuItemHasChildren = event.target.parentElement;

            if (menuItemHasChildren.classList.contains("active")) {

            }
            else {

            }
        }
    }

    return (
        <header className="header">

            {webHeading?.isDispaly &&

                <div className="notice">
                    <marquee className="noticeText">{webHeading?.heading}</marquee>
                </div>
            }

            <div className="header-main">
                <div className="openMenu" onClick={toggleNav}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className="logo">
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>

                <div className={toggleClass ? 'menu-overlay active' : 'menu-overlay'} onClick={toggleNav}>
                </div>
                {/* <!-- navigation menu start --> */}
                <nav className={toggleClass ? 'nav-menu open' : 'nav-menu'} onClick={(e) => navMenu(e)}>

                    <div className="closeNavMenu" onClick={toggleNav}>
                        <img src={close} alt="close" />
                    </div>
                    <ul className="menu">
                        <li className="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">MEN <i className="fa-solid fa-angle-right"></i></a>
                            <ul className="subMenu">
                                {
                                    categories?.men?.map(category => (
                                        <li
                                            key={category?._id}
                                            className='menuItem'
                                        >
                                            <Link to={`category/${category.route}`}>{category?.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li className="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">woMEN <i className="fa-solid fa-angle-right"></i></a>
                            <ul className="subMenu">
                                {
                                    categories?.women?.map(category => (
                                        <li
                                            key={category?._id}
                                            className='menuItem'
                                        >
                                           <Link to={`category/${category.route}`}>{category?.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li className="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">SPORTS <i className="fa-solid fa-angle-right"></i></a>

                            <ul className="subMenu">
                                {
                                    categories?.sports?.map(category => (
                                        <li
                                            key={category?._id}
                                            className='menuItem'
                                        >
                                            <Link to={`category/${category.route}`}>{category?.title}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* <!-- navigation menu end --> */}
                <div className="from">
                    <div className="search">
                        <input type="checkbox" id="check" />
                        <div className="usersNotify box user">
                            <label htmlFor="check">
                                <img src={search} alt="" />
                            </label>
                        </div>


                        <div className="seacrhBox">
                            <input className="input" type="search" placeholder="search..." />
                            <label htmlFor="" className="searchBtn">
                                <img type="submit" alt='' className="search" src={search} />
                            </label>

                        </div>


                        {user ? <div className="usersNotify user">
                            <Link to='/my-dashboard'><img src={userIcon} alt="user" /></Link>
                        </div>
                            :
                            <div className="usersNotify user">
                                <Link to='/login'><AiOutlineLogin className='login-icon' /></Link>
                            </div>
                        }

                        <div className="usersNotify">
                            <Link to='/add-to-card'><img src={bag} alt="" /><span className="notificaTion">{addToCardProducts}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;