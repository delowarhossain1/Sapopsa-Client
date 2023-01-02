import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaShoppingBag,
} from "react-icons/fa";
import {FiShoppingBag, FiUsers} from "react-icons/fi";
import {BsCardHeading} from "react-icons/bs";
import {RiUserSettingsFill} from "react-icons/ri";
import {BiCategoryAlt} from "react-icons/bi";
import { NavLink, Outlet } from 'react-router-dom';
import css from "../../../css/Dashboard.module.css";
import DashboardTitle from './DashboardTitle';

const Dashboard = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/orders",
            name: "Orders",
            icon: <FiShoppingBag />
        },
        {
            path: "/categories",
            name: "Categories",
            icon: <BiCategoryAlt/>
        },
        {
            path: "/product",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "/customers",
            name: "Heading",
            icon: <BsCardHeading />
        },
        {
            path: "/customers",
            name: "Customers",
            icon: <FiUsers />
        },
        {
            path: "/admin",
            name: "Admin",
            icon: <RiUserSettingsFill />
        },
    ]

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
                        <NavLink to={item.path} key={index} className={css.link }>
                            <div className={css.icon}>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className={css.link_text}>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;