import React from "react";
import {createRoot} from "react-dom/client";
import App from "./app/app";
import 'flowbite';
import './style.css'

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(<App/>);