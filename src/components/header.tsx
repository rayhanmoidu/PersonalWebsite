import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { HeaderProps, ContentElementProps, ProfessionalContentElement } from '../types';
import projectJson from '../static/jsonData/projectData.json';
import ProjectElement from './projectElement'
import lebron from "../static/images/lebron.jpg";
import {localImages} from '../static/images/images'

function Header(props: HeaderProps) {
    const tabs: any[] = Object.values(ProfessionalContentElement).filter((tab: any) => !Number.isInteger(tab as number));
     
    return (
        <div className="headerContainer">
            <div className="flexRow">
                {
                    links.map((link: any) => {
                        return (
                            <a target="_blank" href={link.hyperlink}>
                                <div className="iconContainer">
                                    <img className="iconImg" src={localImages[link.iconUrl]} />
                                </div>
                            </a>
                        )
                    })
                }
                <a>
                    <div className="iconContainer last" onClick={()=>{props.changeThemeCallback()}}>
                        <img className="iconImg" src={localImages["changetheme"]} />
                    </div>
                </a>
            </div>
            <div className="flexRow">
                <img src={lebron} className="lebron flipped"/>
                <div className="mainTitle">
                    Rayhan Moidu
                </div>
                <img src={lebron} className="lebron" />
            </div>
            <div className="tabContainer">
                {tabs.map((tab: any) => {
                    return (
                        <Link className={`sidebarTab ${tab == ProfessionalContentElement[props.selectedTab] ? "selected" : ""}`} to={`/${(tab as string).toLowerCase()}`}>{tab}</Link>
                    )
                })}
            </div>
        </div>
    );
}

const links = [{
    key: "Github",
    iconUrl: "github",
    hyperlink: "https://github.com/rayhanmoidu",
},
{
    key: "LinkedIn",
    iconUrl: "linkedin",
    hyperlink: "https://www.linkedin.com/in/rayhanmoidu",
},
{
    key: "Email",
    iconUrl: "email",
    hyperlink: "mailto:rmoidu@uwaterloo.ca",
},]

export default Header;