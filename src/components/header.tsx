import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { HeaderProps, ContentElementProps, ProfessionalContentElement } from '../types';
import projectJson from '../static/jsonData/projectData.json';
import ProjectElement from './projectElement'
import lebron from "../static/images/lebron.jpg";

function Header(props: HeaderProps) {
    const tabs: any[] = Object.values(ProfessionalContentElement).filter((tab: any) => !Number.isInteger(tab as number));

    return (
        <div className="headerContainer">
            <div className="flexRow">
                <img onClick={()=>{props.changeThemeCallback()}} src={lebron} className="lebron flipped"/>
                <div className="mainTitle">
                    Rayhan Moidu
                </div>
                <img onClick={()=>{props.changeThemeCallback()}} src={lebron} className="lebron" />
            </div>
            <div className="tabContainer">
                {tabs.map((tab: any) => {
                    return (
                        <Link className={`sidebarTab ${tab == ProfessionalContentElement[props.selectedTab] ? "selected" : ""}`} to={`/professional/${(tab as string).toLowerCase()}`}>{tab}</Link>
                    )
                })}
            </div>
        </div>
    );
}

export default Header;