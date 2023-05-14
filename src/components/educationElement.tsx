import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, EducationElementProps } from '../types';
import {localImages} from '../static/images/images'

function EducationElement(props: EducationElementProps) {
    const educationContent = <> 
        <img className="projectImage" src={localImages[props.imageUrl]}/>
            <div className="projectInfoContainer">
                {/* <div className="projectTitle">{props.institution}</div> */}
                <div className="experienceElementHeader">
                    <div className="expElemTextPair">
                        <div className="largeText bold">{props.institution}</div>
                        <div className="normalText">{props.degree}</div>
                    </div>
                    <div className="expElemTextPair right">
                        <div className="largeText">{props.location}</div>
                        <div className="normalText">{props.dates}</div>
                    </div>
                </div>
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
    </>
    if (props.href !="") {
        return (
            <a target="_blank" href={props.href} className="projectElementContainer anostyle">
                {educationContent}
            </a>
        )
    } else {
        return <div className="projectElementContainer">
            {educationContent}
        </div>
    }
}

export default EducationElement;