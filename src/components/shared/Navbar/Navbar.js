import React from 'react';
import logo from "../../../images/sapopsa.png";
import close from "../../../images/close.svg";
import search from "../../../icons/search.png";
import user from "../../../icons/user.png";
import love from "../../../icons/love.png";
import bag from "../../../icons/bag.png";

const Navbar = () => {
    return (
        <header class="header">
            <a href="#">
                <div class="notice">
                    <p class="noticeText">WELCOME TO OUR ONLINE STORE,NOTICES HERE......</p>
                </div>
            </a>
            <div class="header-main">
                <div class="openMenu">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div class="logo">
                    <a href="#"><img src={logo} alt="" /></a>
                </div>

                <div class="menu-overlay">
                </div>
                {/* <!-- navigation menu start --> */}
                <nav class="nav-menu">
                    <div class="closeNavMenu">
                        <img src={close} alt="close"/>
                    </div>
                    <ul class="menu">
                        <li class="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">MEN <i class="fa-solid fa-angle-right"></i></a>
                            <ul class="subMenu">
                                <li class="menuItem"><a href="manst t-shirt.html">Men Polo Shirt</a></li>
                                <li class="menuItem"><a href="polo t-shirt.html">Men t-Shirt</a></li>
                                <li class="menuItem"><a href="polo t-shirt.html">Men Shirt</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">hoodie</a></li>
                                <li class="menuItem"><a href="polo t-shirt.html">sweater v-neck</a></li>
                                <li class="menuItem"><a href="polo t-shirt.html">men shorts</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">cargo Shorts</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">sweat shirt</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">track suit</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">jacket</a></li>
                                <li class="menuItem"><a href="manst t-shirt.html">sweater</a></li>
                            </ul>
                        </li>
                        <li class="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">woMEN <i class="fa-solid fa-angle-right"></i></a>
                            <ul class="subMenu">
                                <li class="menuItem"><a href="manst t-shirt.html">woMen t-Shirt</a></li>
                                <li class="menuItem"><a href="#">woMen Shirt</a></li>
                                <li class="menuItem"><a href="#">gardigan</a></li>
                                <li class="menuItem"><a href="#">hoodie</a></li>
                                <li class="menuItem"><a href="#">frock</a></li>
                                <li class="menuItem"><a href="#">skist</a></li>
                                <li class="menuItem"><a href="#">shirred dress</a></li>
                                <li class="menuItem"><a href="#">panafore</a></li>
                                <li class="menuItem"><a href="#">woman tops</a></li>
                            </ul>
                        </li>
                        <li class="menuItem menuitemHasChildren">
                            <a href="#" data-toggle="subMenu">SPORTS <i class="fa-solid fa-angle-right"></i></a>
                            <ul class="subMenu">
                                <li class="menuItem"><a href="#">jersy kit</a></li>
                                <li class="menuItem"><a href="#">sports t-shirt</a></li>
                                <li class="menuItem"><a href="#">sports shorts</a></li>
                                <li class="menuItem"><a href="#">Football Jersey</a></li>
                                <li class="menuItem"><a href="#">TROUSER</a></li>
                            </ul>
                        </li>
                        <li class="menuItem menuitemHasChildren">
                            <a class="moreB" href="#" data-toggle="subMenu">SALE <i class="fa-solid fa-angle-right"></i></a>
                        </li>
                        <li class="menuItem menuitemHasChildren">
                            <a class="moreB" href="#" data-toggle="subMenu">More <i class="fa-solid fa-angle-right"></i></a>
                            <ul class="subMenu">
                                <li class="menuItem"><a href="#">help</a></li>
                                <li class="menuItem"><a href="#">exchanges & returns</a></li>
                                <li class="menuItem"><a href="order-traker.html">order tracker</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                {/* <!-- navigation menu end --> */}
                <div class="from">
                    <div class="search">
                        <input type="checkbox" id="check"/>
                            <div class="usersNotify box user">
                                <label for="check">
                                    <img src={search} alt=""/>
                                </label>
                            </div>


                            <div class="seacrhBox">
                                <input class="input" type="search" placeholder="search..."/>
                                    <label for="" class="searchBtn">
                                        <img type="submit" class="search" src={search}/>
                                    </label>

                            </div>


                            <div class="usersNotify user">
                                <a href="login.html"><img src={user} alt=""/><span class="notificaTion">1</span></a>
                            </div>
                            <div class="usersNotify love">
                                <a href="#"><img src={love} alt=""/><span class="notificaTion">1</span></a>
                            </div>

                            <div class="usersNotify">
                                <a href="cart.html"><img src={bag} alt=""/><span class="notificaTion">1</span></a>
                            </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;