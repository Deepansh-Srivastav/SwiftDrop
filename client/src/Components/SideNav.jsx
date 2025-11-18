import { Divider, } from "@mui/material";
import { ArrowForwardIosIcon, ArrowBackIosNewIcon } from "../Assets/Icons";
import { useState } from "react";
import { projectImages } from "../Assets/Assets.js"
import { LogoutIcon } from "../Assets/Icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { accountSideMenu } from "../Networking/Constants/menuConfig.js";
import "../Styles/Nav.css"

const SideNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;



    const userDetails = useSelector((state) => state.userDetails);
    return (
        <aside className="side-nav">

            <div className="menu-icon-and-list-container">
                <div className="brand-logo-container" onClick={()=>navigate('/')}>
                    <img src={projectImages?.swiftDropLogo} alt="Swift drop logo" loading="lazy" />
                </div>
                <Divider />

                <div className="side-nav-list-container">
                    <ul className="side-nav-list">
                        {accountSideMenu?.map((menuItem, index) => {
                            const Icon = menuItem?.icon

                            return (
                                <li
                                    key={index}
                                    onClick={() => navigate(menuItem.path)}
                                    className={`side-nav-list-item ${currentPath === `/my-account/${menuItem.path}` ? "active" : ""}`}
                                >

                                    <span className="sid-nav-list-icon"><Icon /></span>
                                    <span className="sid-nav-list-label">{menuItem?.label} </span>
                                </li>
                            )
                        })}
                        <Divider />
                        <li
                            onClick={() => navigate()}
                            className={`side-nav-list-item`}
                        >

                            <span className="sid-nav-list-icon"><LogoutIcon /></span>
                            <span className="sid-nav-list-label"> Log-out</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="user-badge-container">
                <div className="user-badge-image">
                    <span className="user-avatar">
                        {userDetails?.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                </div>
                <div className="user-badge-details">
                    <span className="user-name">{userDetails?.name}</span>
                    <span className="user-email">{userDetails?.email}</span>
                </div>
            </div>

        </aside>
    )
}

export default SideNav;