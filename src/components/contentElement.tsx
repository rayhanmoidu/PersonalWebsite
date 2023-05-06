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
import researchJson from '../static/jsonData/researchData.json';
import {ProjectElement, AboutElement, ExperienceElement, EducationElement, SkillsElement, ResearchElement} from './index';
import rayhan from "../static/images/rayhan.png";

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
            const languagesSection = <SkillsElement skillSection='Languages' skillList={skillsJson.languages}/>
            const technologiesSection = <SkillsElement skillSection='Technologies' skillList={skillsJson.technologies}/>
            const toolsSection = <SkillsElement skillSection='Dev Tools' skillList={skillsJson.devTools}/>
            return (
                [<div className="aboutContainter">
                    <div className="photoAndSkills">
                        <img className="personalPhoto" src={rayhan}></img>
                        <div>
                            {languagesSection}
                            {technologiesSection}
                            {toolsSection}
                        </div>
                    </div>
                    <div className="aboutElementContainer">
                        {aboutJson.description.map((descriptionElement) => {
                            return <AboutElement descriptionElement={descriptionElement} />
                        })}
                    </div>
                </div>]
            );
        case ProfessionalContentElement.Education:
            return [<div className="projectsContainer">
                {educationJson.map((educationDataElem) => {
                    return <EducationElement imageUrl={educationDataElem.imageUrl} institution={educationDataElem.institution} degree={educationDataElem.degree} location={educationDataElem.location} dates={educationDataElem.dates} description={educationDataElem.description}/>
                })}
            </div>]
        case ProfessionalContentElement.Work:
            const workElement = <ExperienceElement experienceList={experienceJson.work}/>
            return [workElement];
        // case ProfessionalContentElement.Skills:
        //     const languagesSection = <SkillsElement skillList={skillsJson.languages}/>
        //     const technologiesSection = <SkillsElement skillList={skillsJson.technologies}/>
        //     const toolsSection = <SkillsElement skillList={skillsJson.devTools}/>
        //     return [languagesSection, technologiesSection, toolsSection];
        case ProfessionalContentElement.Projects:
            const projectData: ProfessionalProjectData[] = projectJson.filter((projectDataElem) => projectDataElem.public);
            return [<div className="projectsContainer">
                {projectData.map((projectDataElem) => {
                    return <ProjectElement title={projectDataElem.title} description={projectDataElem.description} projectUrl={projectDataElem.projectUrl} imageUrl={projectDataElem.imageUrl}/>
                })}
            </div>]
        case ProfessionalContentElement.Research:
            const researchElement = <ResearchElement experienceList={researchJson.research}/>
            return [researchElement];
    }
} 

export default ContentElement;