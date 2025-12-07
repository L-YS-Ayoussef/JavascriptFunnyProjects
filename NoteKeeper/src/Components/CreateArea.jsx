import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
// you can go the the [material icons] in the documentation and search for the icon you want, then get its import code

function CreateArea(props) {
    const [isExpanded, setExpanded] = useState(false);
    function handleClickTextArea(){
        setExpanded(true);
    }

    const [newNote, setNote] = useState({
        title: "", 
        content: ""
    });
    function handleChange(event){
        const {name: target, value: val} = event.target;
        setNote((preVal) => {
            return {
                ...preVal,
                 [target]: val
            }
        });
    }

    return (
        <div>
        <form className="create-note">
            {
                isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={newNote.title}/>
            }
            <textarea onClick={handleClickTextArea} onChange={handleChange} name="content" placeholder="Take a note..." rows={isExpanded ? "3":"1"} value={newNote.content} />
            <Zoom in={true}>

                <Fab onClick={(event) => {
                    event.preventDefault();
                    props.onChecked(newNote);
                    setNote({title: "", content: ""});
                    }}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
        </div>
    );
}

export default CreateArea;
