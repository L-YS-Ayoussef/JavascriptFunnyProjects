import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
// here importing the [Delete] for the package installed using [Hyper] command line, go to the documentation of the package [mui], then get the command to install any package 
// here are the commands --> [npm install @mui/material @emotion/react @emotion/styled], [npm install @mui/icons-material]


function Note(params){
    return (
        <div className='note'>
            <h1>{params.title}</h1>
            <p>{params.content}</p>
            <button onClick={() => {params.onChecked(params.id)}}><DeleteIcon /></button>
        </div>
    );
}

export default Note;
