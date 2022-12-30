import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
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
            path: "/about",
            name: "About",
            icon: <FaUserAlt />
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaRegChartBar />
        },
        {
            path: "/comment",
            name: "Comment",
            icon: <FaCommentAlt />
        },
        {
            path: "/product",
            name: "Product",
            icon: <FaShoppingBag />
        },
        {
            path: "/productList",
            name: "Product List",
            icon: <FaThList />
        }
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
                <DashboardTitle />

                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;