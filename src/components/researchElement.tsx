import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, ExperienceElementProps, ExperienceElementData, ExperienceTermData, ResearchElementData, ResearchElementProps } from '../types';
import {experienceImages} from '../static/images/images'

function ResearchElement(props: ResearchElementProps) {

    return (
        <div className="experienceSectionContainer">
            <div className="experienceSectionElementContainer">
                {
                    props.experienceList.map((experienceElement: ResearchElementData) => {
                        let termInfo: ExperienceTermData;
                        if (experienceElement.numTerms == 1) {
                            termInfo = experienceElement.termInfo[0];
                            return (
                                <div className="projectElementContainer">
                                    <img className="projectImage" src={experienceImages[experienceElement.imgUrl]}/>
                                    <div className="projectInfoContainer">
                                        <div className="experienceElementHeader">
                                            <div className="expElemTextPair">
                                                <div className="largeText bold">{experienceElement.institution}</div>
                                                <div className="normalText">{experienceElement.location}</div>
                                            </div>
                                            <div className="expElemTextPair right">
                                                <div className="largeText">{termInfo.position}</div>
                                                <div className="normalText">{termInfo.dates}</div>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                termInfo.description.map((descriptionElement) => {
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
                            )
                        } else {
                            return (
                                <div className="projectElementContainer">
                                    <img className="projectImage" src={experienceImages[experienceElement.imgUrl]}/>
                                    <div className="projectInfoContainer">
                                        <div className="experienceElementHeader">
                                            <div className="expElemTextPair">
                                                <div className="largeText bold">{experienceElement.institution}</div>
                                                <div className="italics">{experienceElement.group}</div>
                                            </div>
                                            <div className="expElemTextPair right">
                                                <div className="largeText">{experienceElement.location}</div>
                                            </div>
                                        </div>
                                        <div className="researchDescription">
                                            {experienceElement.description}
                                        </div>
                                        <div>
                                            {
                                                experienceElement.termInfo.map((termInfo) => {
                                                    return (
                                                        <div>
                                                            <div className="researchHeader">
                                                                <div className="bold">{termInfo.position}</div>
                                                                <div>{termInfo.dates}</div>
                                                            </div>
                                                            {
                                                                termInfo.description.map((descriptionElement) => {
                                                                    return (
                                                                        <div className="projectDescriptionElement">
                                                                            {descriptionElement}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>

    );
}

export default ResearchElement;