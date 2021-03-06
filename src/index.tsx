import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import { ColorModeScript } from "@chakra-ui/react"

import { App } from "./App"
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <ColorModeScript />
        <App />
    </React.StrictMode>,
);
