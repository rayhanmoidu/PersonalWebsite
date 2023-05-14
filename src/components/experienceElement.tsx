import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalSidebarProps, ExperienceElementProps, ExperienceElementData, ExperienceTermData } from '../types';
import {localImages} from '../static/images/images'

function ExperienceElement(props: ExperienceElementProps) {

    return (
        <div className="experienceSectionContainer">
            <div className="experienceSectionElementContainer">
                {
                    props.experienceList.map((experienceElement: ExperienceElementData) => {
                        let termInfo: ExperienceTermData;
                        if (experienceElement.numTerms == 1) {
                            termInfo = experienceElement.termInfo[0];
                            const experienceContent = (
                                <>
                                    <img className="projectImage" src={localImages[experienceElement.imgUrl]}/>
                                    <div className="projectInfoContainer">
                                        <div className="experienceElementHeader">
                                            <div className="expElemTextPair">
                                                <div className="largeText bold">{experienceElement.organization}</div>
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
                                </>
                            );
                            if (experienceElement.href !="") {
                                return (
                                    <a target="_blank" href={experienceElement.href} className="projectElementContainer anostyle">
                                        {experienceContent}
                                    </a>
                                )
                            } else {
                                return <div className="projectElementContainer">
                                    {experienceContent}
                                </div>
                            }
                            return (
                                <div className="projectElementContainer">
                                    <img className="projectImage" src={localImages[experienceElement.imgUrl]}/>
                                    <div className="projectInfoContainer">
                                        <div className="experienceElementHeader">
                                            <div className="expElemTextPair">
                                                <div className="largeText bold">{experienceElement.organization}</div>
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
                                    <img className="projectImage" src={localImages[experienceElement.imgUrl]}/>
                                    <div className="projectInfoContainer">
                                        <div className="experienceElementHeader">
                                            <div className="expElemTextPair">
                                                <div className="largeText bold">{experienceElement.organization}</div>
                                                <div className="normalText">{experienceElement.location}</div>
                                            </div>
                                            <div className="expElemTextPair right">
                                                {/* <div className="largeText">{termInfo.position}</div>
                                                <div className="normalText">{termInfo.dates}</div> */}
                                            </div>
                                        </div>
                                        <div>
                                            {/* {
                                                termInfo.description.map((descriptionElement) => {
                                                    return (
                                                        <div className="projectDescriptionElement">
                                                            {descriptionElement}
                                                        </div>
                                                    );
                                                })
                                            } */}
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

export default ExperienceElement;