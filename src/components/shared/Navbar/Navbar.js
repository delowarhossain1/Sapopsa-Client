import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/sapopsa.png";
import close from "../../../images/close.svg";
import search from "../../../icons/search.png";
import userIcon from "../../../icons/user.png";
import bag from "../../../icons/bag.png";
import { AiOutlineLogin } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { getProducts } from "../../../utilites/addToCard";
import { useQuery } from 'react-query';
import axios from 'axios';

const Navbar = ({ refetch }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [addToCardProducts, setaddToCardProducts] = useState(0);
    const [webHeading, setWebHeading] = useState({ heading: '', isDispaly: false });
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState(null);
    const mediaSize = 991;

    // Get add to card products
    useEffect(() => {
        const products = getProducts();
        setaddToCardProducts(products?.length);
    }, [refetch]);

    // Get web heading
    const getWebHeading = useQuery('nav-web-heading', ()=>(
        axios.get('/api/web-heading')
        .then(res => setWebHeading(res?.data))
    ));

    // Get cagories
    const {data:categories} = useQuery('nav-categories-list', ()=>(
        axios.get('/api/categories-list')
        .then(res => res?.data)
    ));

    // Handle search
    const handleSearch = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        if(text?.length > 3){
            navigate(`/search/${text}`);
        }
    }

    // This code for navbar;
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        document.body.classList.toggle("hidden-scrolling");
    }

    const handleMenuItemClick  = (event) =>{
        event.preventDefault();
        const menuItemHasChildren = event.target.parentElement;

        if( menuItemHasChildren.hasAttribute("data-toggle") &&
        window.innerWidth <= mediaSize){

            if(menuItemHasChildren === activeMenuItem){
                
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

                <div className={isNavOpen ? 'menu-overlay active' : 'menu-overlay'} onClick={toggleNav}>
                </div>
                {/* <!-- navigation menu start --> */}
                <nav className={isNavOpen ? 'nav-menu open' : 'nav-menu'}>

                    <div className="closeNavMenu" onClick={toggleNav}>
                        <img src={close} alt="close" />
                    </div>
                    <ul className="menu">
                        <li className="menuItem menuitemHasChildren" >
                            <a href="#" 
                            data-toggle="subMenu"
                            >MEN 
                            <i className="fa-solid fa-angle-right"></i></a>

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


                        <form className="seacrhBox" onSubmit={handleSearch}>
                            <input className="input" type="search" placeholder="search here..." name="text" autoComplete='off' autoFocus />

                            <button type="submit" className='searchTextsubmitBtn'>
                                <img  alt='search'  src={search}  />
                            </button>

                        </form>


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