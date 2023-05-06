import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, SkillsElementProps } from '../types';

function SkillsElement(props: SkillsElementProps) {
    return (
        <div className="skillSection">
            <div><strong>{props.skillSection}</strong>: {props.skillList}</div>
        </div>
    );
}

export default SkillsElement;