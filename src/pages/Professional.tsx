import React, {useState, useEffect} from 'react';
import '../styles/professional.css';
import { Link } from "react-router-dom";
import {ContentElement, Sidebar, Header} from '../components/index'
import { ProfessionalLandingPageProps, ProfessionalContentElement } from '../types';
import nophones from "../static/images/nophones.png";
import {Lala} from '../components/p5sketch';

import miroirs from "../components/miroirs.mp3"


function Professional(props: ProfessionalLandingPageProps) {

  const [isThemeStateInverted, setIsThemeStateInverted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false)

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }

  useEffect(() => {
      // new Audio(miroirs).play()
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

  // useEffect(() => {
  //   console.log("this should not be starting again and again") 
  //   startFlickerTimeout(() => {
  //     setIsThemeStateInverted(value => !value)
  //   })
  // }, []);
  // if (isMobile) {
  //   return (<div className="nophones"></div>)
  // } else {
    return (
      <div className="mainframe">
        <Lala />
        {/* <button onClick={()=>{new Audio(miroirs).play()}}></button> */}
        {/* <Sidebar pos="left" shouldInvertTheme={isThemeStateInverted}/>
        <div className="professionalContent">
          <Header selectedTab={props.tabToRender} changeThemeCallback={()=>{setIsThemeStateInverted(!isThemeStateInverted)}}/>
          <ContentElement jsonKey={props.tabToRender}/>
        </div>
        <Sidebar pos="right" shouldInvertTheme={isThemeStateInverted}/> */}
      </div>
    );
  // }
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
