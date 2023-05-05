import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';
import '../styles/professional.css';
import { ProfessionalProjectData, ContentElementProps, ProfessionalContentElement, ExperienceElementData } from '../types';
import projectJson from '../static/jsonData/projectData.json';
import aboutJson from '../static/jsonData/aboutData.json';
import educationJson from '../static/jsonData/educationData.json';
import experienceJson from '../static/jsonData/experienceData.json';
import skillsJson from '../static/jsonData/skillsData.json';
import {ProjectElement, AboutElement, ExperienceElement, EducationElement, SkillsElement} from './index';

function ContentElement(props: ContentElementProps) {
    const elementsToRender = getTSXElementsToRender(props.jsonKey);
    return (
        <div className="contentContainer">
            {elementsToRender.map((TSXElem) => TSXElem)}
        </div>
    );
}

function getTSXElementsToRender(jsonKey: ProfessionalContentElement): JSX.Element[] {
    console.log(projectJson)
    switch (jsonKey) {
        case ProfessionalContentElement.About:
            return [<div className="aboutContainter">
                {aboutJson.description.map((descriptionElement) => {
                    return <AboutElement descriptionElement={descriptionElement} />
                })}
            </div>]
        case ProfessionalContentElement.Education:
            return educationJson.map((educationDataElem) => {
                return <EducationElement institution={educationDataElem.institution} degree={educationDataElem.degree} location={educationDataElem.location} dates={educationDataElem.dates} description={educationDataElem.description}/>
            })
        case ProfessionalContentElement.Experience:
            const researchElement = <ExperienceElement experienceList={experienceJson.research} title="Research Experience"/>
            const workElement = <ExperienceElement experienceList={experienceJson.work} title="Work Experience"/>
            return [researchElement, workElement];
        case ProfessionalContentElement.Skills:
            const languagesSection = <SkillsElement skillList={skillsJson.languages}/>
            const technologiesSection = <SkillsElement skillList={skillsJson.technologies}/>
            const toolsSection = <SkillsElement skillList={skillsJson.devTools}/>
            return [languagesSection, technologiesSection, toolsSection];
        case ProfessionalContentElement.Projects:
            const projectData: ProfessionalProjectData[] = projectJson.filter((projectDataElem) => projectDataElem.public);
            return [<div className="projectsContainer">
                {projectData.map((projectDataElem) => {
                    return <ProjectElement title={projectDataElem.title} description={projectDataElem.description} projectUrl={projectDataElem.projectUrl} imageUrl={projectDataElem.imageUrl}/>
                })}
            </div>]
        case ProfessionalContentElement.Research:
            return [<div></div>]
    }
} 

export default ContentElement;