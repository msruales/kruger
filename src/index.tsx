import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import { ColorModeScript } from "@chakra-ui/react"

import { App } from "./App"
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <ColorModeScript />
        <App />
    </React.StrictMode>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <ColorModeScript />
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root"),
// )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
