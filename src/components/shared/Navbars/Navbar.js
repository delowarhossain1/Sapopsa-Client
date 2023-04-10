import React, { useEffect, useRef, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate, } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import logo from "../../../images/sapopsa.png";
import search from "../../../icons/search.png";
import auth from '../../../firebase.init';
import userIcon from "../../../icons/user.png";
import bag from "../../../icons/bag.png";
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';

/*
    <div className={css.navbarTitle}>
                <marquee>Hello how are you all?</marquee>
            </div>
*/
const Navbar = () => {
    const allMenu = useRef();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [isOpenMenu, setIsOpenMenu] = useState(false);


    // Handle menu
    const handleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
        allMenu.current.classList.toggle('openMenu');
    };

    // Handle search
    const handleSearch = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        if (text?.length > 3) {
            navigate(`/search/${text}`);
        }
    }

    return (
        <header>
            <div className="menuContainer">
                <div className='logoAndMenuBtnContainer'>
                    <span onClick={handleMenu} id='navbarBtn'>
                        {isOpenMenu ? <GrClose /> : <GiHamburgerMenu />}
                    </span>

                    <Link to='/' className="navbarLogo">
                        <img src={logo} alt="" />
                    </Link>
                </div>


                <nav className="navbar" ref={allMenu}>
                    <ul>
                        <li><a href="#">MEN</a>
                            <ul>
                                <li><Link to='/'>Blog</Link></li>
                                <li><Link to='/'>Services</Link></li>
                            </ul>
                        </li>
                        <li><a href="#">WOMEN</a>
                            <ul>
                                <li><Link to='/'>Blog</Link></li>
                                <li><Link to='/'>Services +</Link></li>
                            </ul>
                        </li>
                        <li><a href="#">SPORTS</a>
                            <ul>
                                <li><Link to='/'>Blog</Link></li>
                                <li><Link to='/'>Services +</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                <div className='navbarRight'>
                    <input type="checkbox" id="check" />
                    <div className="usersNotify box user ">
                        <label htmlFor="check">
                            <img src={search} alt="" style={{width : '40px', margin: '5px 5px 0px 0px'}}/>
                        </label>
                    </div>

                    <form className="seacrhBox" onSubmit={handleSearch}>
                        <input className="input" type="search" placeholder="search here..." name="text" autoComplete='off' autoFocus />

                        <button type="submit" className='searchTextsubmitBtn'>
                            <img alt='search' src={search} />
                        </button>

                    </form>

                    <div className="navbarShoppingIcon">
                        <Link to='/add-to-card'><img src={bag} alt="" /><span className="notificaTion">{0}</span></Link>
                    </div>


                    <div className='navbar-login'>
                        {
                            user ?
                                <Link to='/my-dashboard' title='Dashboard'>
                                    <AiOutlineUser />
                                </Link>
                                :
                                <Link to='/login'>
                                    Login
                                </Link>
                        }
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Navbar;