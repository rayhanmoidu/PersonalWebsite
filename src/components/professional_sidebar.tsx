import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, ProfessionalContentElement } from '../types';


function Sidebar(props: ProfessionalSidebarProps) {
    let className = "";
    className += props.pos =="left" ? "sidebarContainerLeft " : "sidebarContainerRight ";
    className += props.shouldInvertTheme ? "Inverted" : ""
    return (
        <div className={className}>
        </div>
    );
}

export default Sidebar;