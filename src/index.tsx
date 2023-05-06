import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { create } from 'domain';
import Professional from './pages/Professional';
import { ProfessionalContentElement } from './types';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "professional/about",
    element: <Professional tabToRender={ProfessionalContentElement.About}/>
  },
  {
    path: "professional/projects",
    element: <Professional tabToRender={ProfessionalContentElement.Projects}/>
  },
  {
    path: "professional/work",
    element: <Professional tabToRender={ProfessionalContentElement.Work}/>
  },
  {
    path: "professional/education",
    element: <Professional tabToRender={ProfessionalContentElement.Education}/>
  },
  // {
  //   path: "professional/skills",
  //   element: <Professional tabToRender={ProfessionalContentElement.Skills}/>
  // },
  {
    path: "professional/research",
    element: <Professional tabToRender={ProfessionalContentElement.Research}/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);