import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, ProjectElementProps } from '../types';
import img from '../static/images/meshGeneration.png'
import { pathToFileURL } from 'url';
import {projectImages} from '../static/images/images'

function ProjectElement(props: ProjectElementProps) {
    console.log(props.imageUrl)
    return (
        <div className="projectElementContainer">
            <img className="projectImage" src={projectImages[props.imageUrl]}/>
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
        </div>
    );
}

export default ProjectElement;