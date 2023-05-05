import React, {useState} from 'react';
import '../styles/professional.css';
import { Link } from "react-router-dom";
import {ContentElement, Sidebar, Header} from '../components/index'
import { ProfessionalLandingPageProps, ProfessionalContentElement } from '../types';


function Professional(props: ProfessionalLandingPageProps) {

  const [isThemeStateInverted, setIsThemeStateInverted] = useState(true); 
  return (
    <div className="mainframe">
      <Sidebar pos="left" shouldInvertTheme={isThemeStateInverted}/>
      <div className="professionalContent">
        <Header selectedTab={props.tabToRender} changeThemeCallback={()=>{setIsThemeStateInverted(!isThemeStateInverted)}}/>
        <ContentElement jsonKey={props.tabToRender}/>
      </div>
      <Sidebar pos="right" shouldInvertTheme={isThemeStateInverted}/>
    </div>
  );
}

export default Professional;
