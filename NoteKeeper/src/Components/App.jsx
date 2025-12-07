import React, {useState} from 'react';
import Heading from './Heading.jsx';
import Footer from './Footer.jsx';
import Note from './Note.jsx';
import CreateArea from './CreateArea.jsx';



function App(){

    const [Notes, setNotes] = useState([]);


    function addNote(note){
        setNotes((preVal) => {
            return [...preVal, note]
        });
    }

    function deleteNote(id){
        setNotes(Notes.filter((item, index) => {return index!==id;}));
    }

    return (
        <div>
            <Heading />
            <CreateArea onChecked={addNote}/>

            {Notes.map((item, index) => {
               return <Note key={index} id={index} title={item.title} content={item.content} onChecked={deleteNote} />
            })}
            <Footer />
        </div>
    );
}

export default App;
