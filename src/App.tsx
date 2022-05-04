import AppRouter from "./routes/AppRouter";
import * as React from "react"
import { Provider } from 'react-redux'
import {BrowserRouter} from "react-router-dom";
import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"

import {store} from "./redux/store";

export const App = () => (
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>

)
