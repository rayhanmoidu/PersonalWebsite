export interface ProfessionalSidebarProps {
    pos: string;
    shouldInvertTheme: boolean;
}

export interface ProfessionalLandingPageProps {
    tabToRender: ProfessionalContentElement;
}

export interface HeaderProps {
    selectedTab: ProfessionalContentElement;
    changeThemeCallback: CallableFunction;
}

export enum ProfessionalContentElement {
    About = 1,
    Projects,
    Work,
    Research,
    Education,
}

export interface ProjectElementProps {
    title: string;
    description: string[];
    imageUrl: string;
    projectUrl: string;
}

export interface AboutElementProps {
    descriptionElement: string;
}

export interface SkillsElementProps {
    skillList: string;
    skillSection: string;
}

export interface EducationElementProps {
    institution: string;
    degree: string;
    location: string;
    dates: string;
    description: string[];
    imageUrl: string;
    href: string;
}

export interface ResearchElementProps {
    experienceList: ResearchElementData[];
}

export interface ResearchElementData {
    institution: string;
    group: string;
    description: string;
    location: string;
    numTerms: number;
    href: string;
    imgUrl: string;
    termInfo: ExperienceTermData[];
}

export interface ExperienceElementProps {
    experienceList: ExperienceElementData[];
}

export interface ExperienceElementData {
    organization: string;
    location: string;
    numTerms: number;
    imgUrl: string;
    href: string;
    termInfo: ExperienceTermData[];
}

export interface ExperienceTermData {
    position: string;
    dates: string;
    description: string[];
}

export interface ProfessionalProjectData {
    title: string;
    description: string[];
    projectUrl: string;
    imageUrl: string;
    public: boolean;
}

export interface ProfessionalAboutData {
    description: string[];
}

export interface ProfessionalEducationData {
    institution: string;
    degree: string;
    location: string;
    dates: string;
    description: string[];
}

export interface ProfessionalExperienceData {
    research: ExperienceElementProps[];
    work: ExperienceElementProps[];
}

export interface ProfessionalSkillsData {
    languages: string;
    technologies: string;
    tools: string;
}

export interface ContentElementProps {
    jsonKey: ProfessionalContentElement;
}