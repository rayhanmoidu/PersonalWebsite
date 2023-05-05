import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, AboutElementProps } from '../types';

function AboutElement(props: AboutElementProps) {
    props.descriptionElement.replace("University", '<b>' + "University" + "</b>");
    return (
        <text className="aboutElementContainer">
            {props.descriptionElement}
        </text>

    );
}

export default AboutElement;