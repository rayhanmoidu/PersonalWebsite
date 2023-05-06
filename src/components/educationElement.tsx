import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, EducationElementProps } from '../types';
import {experienceImages} from '../static/images/images'

function EducationElement(props: EducationElementProps) {
    return (
        <div className="projectElementContainer">
            <img className="projectImage" src={experienceImages[props.imageUrl]}/>
            <div className="projectInfoContainer">
                <div className="projectTitle">{props.institution}</div>
                <div>
                    {
                        props.description.map((descriptionElement) => {
                            return (
                                <div className="projectDescriptionElement">
                                    {descriptionElement}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>

    );
}

export default EducationElement;