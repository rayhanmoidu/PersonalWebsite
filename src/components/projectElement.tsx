import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, ProjectElementProps } from '../types';
import img from '../static/images/meshGeneration.png'
import { pathToFileURL } from 'url';
import {localImages} from '../static/images/images'

function ProjectElement(props: ProjectElementProps) {
    console.log(props.imageUrl)

    const returnElement = (
        <>
            <img className="projectImage" src={localImages[props.imageUrl]}/>
            <div className="projectInfoContainer">
                <div className="projectTitle">{props.title}</div>
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
    )
    if (props.projectUrl != "") {
        return (
            <a href={props.projectUrl} className="projectElementContainer anostyle">
                {returnElement}
            </a>
        )
    } else {
        return (
            <div className="projectElementContainer">
                {returnElement}
            </div>
        )
    }
}

export default ProjectElement;