import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./src//App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
