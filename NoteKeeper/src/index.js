import React from 'react';
import ReactDOM from 'react-dom/client'; // or you can just import the ReactDOM method [ { createRoot } ] from "react-dom/client";
import App from './Components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div>
        <App />
    </div>
)

