import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaShoppingBag,
} from "react-icons/fa";
import { FiSettings, FiShoppingBag, FiUsers } from "react-icons/fi";
import { BsCardHeading } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { CgDisplayFullwidth } from "react-icons/cg";
import { NavLink, Outlet } from 'react-router-dom';
import css from "../../../css/Dashboard.module.css";
import { AiOutlineLogout } from 'react-icons/ai';
import { useSignOut } from 'react-firebase-hooks/auth';
import auth from './../../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const Dashboard = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [signOut, signOutLoading] = useSignOut(auth);
    const [activeLink, setActiveLink] = useState('Dashboard');
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "manage-orders",
            name: "Orders",
            icon: <FiShoppingBag />
        },
        {
            path: "manage-products",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "manage-categories",
            name: "Categories",
            icon: <BiCategoryAlt />
        },
        {
            path: "manage-slider",
            name: "Slider",
            icon: <CgDisplayFullwidth />
        },
        {
            path: "customers",
            name: "Customers",
            icon: <FiUsers />
        },
        {
            path: "admins",
            name: "Admin",
            icon: <RiUserSettingsFill />
        },
        {
            path: "settings",
            name: "Settings",
            icon: <FiSettings />
        },
    ]

    if (signOutLoading) {
        return <Loading />
    }

    return (
        <div className={css.container}>
            <div style={{ width: isOpen ? "200px" : "50px" }} className={css.sidebar}>
                <div className={css.top_section}>

                    <h1 style={{ display: isOpen ? "block" : "none" }} className={css.logo}>
                        Sapopsa
                    </h1>

                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className={css.bars}>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink 
                            to={item.path}
                            key={index} 
                            className={activeLink === item?.name ? `${css.link} ${css.activeLink}` : `${css.link}`}
                            onClick={()=> setActiveLink(item.name)}
                            >
                            <div className={css.icon}>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className={css.link_text}>{item.name}</div>
                        </NavLink>
                    ))
                }

                {/* Log out button */}
                <div className={css.link} onClick={() => signOut()} style={{ cursor: "pointer" }}>
                    <div className={css.icon}><AiOutlineLogout /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className={css.link_text}>Log out</div>
                </div>

            </div>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;