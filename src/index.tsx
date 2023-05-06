import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect
} from "react-router-dom";
import { create } from 'domain';
import Professional from './pages/Professional';
import { ProfessionalContentElement } from './types';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Professional tabToRender={ProfessionalContentElement.About}/>
  },
  {
    path: "/about",
    element: <Professional tabToRender={ProfessionalContentElement.About}/>
  },
  {
    path: "/projects",
    element: <Professional tabToRender={ProfessionalContentElement.Projects}/>
  },
  {
    path: "/work",
    element: <Professional tabToRender={ProfessionalContentElement.Work}/>
  },
  {
    path: "/education",
    element: <Professional tabToRender={ProfessionalContentElement.Education}/>
  },
  {
    path: "/research",
    element: <Professional tabToRender={ProfessionalContentElement.Research}/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);