import React, {useState, useEffect} from 'react';
import '../styles/professional.css';
import { Link } from "react-router-dom";
import {ContentElement, Sidebar, Header} from '../components/index'
import { ProfessionalLandingPageProps, ProfessionalContentElement } from '../types';


function Professional(props: ProfessionalLandingPageProps) {

  const [isThemeStateInverted, setIsThemeStateInverted] = useState(false);

  // useEffect(() => {
  //   console.log("this should not be starting again and again") 
  //   startFlickerTimeout(() => {
  //     setIsThemeStateInverted(value => !value)
  //   })
  // }, []);
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

function startFlickerTimeout(changeThemeCallback: any) {
  const min = 250;
    const max = 5000;
    const rand = min + Math.random() * (max - min);
  setTimeout(() => {
    // change theme (start flicker)
    changeThemeCallback();
    // change theme after 50 ms (end flicker)
    const min = 10;
    const max = 200;
    const rand2 = min + Math.random() * (max - min);
    setTimeout(() => {
      changeThemeCallback();
    }, rand2);
    // trigger another flicker in a random number of seconds
    startFlickerTimeout(changeThemeCallback);
  }, rand)
}

export default Professional;
