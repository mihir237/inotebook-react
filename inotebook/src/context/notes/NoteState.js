import NoteContext from "./noteContext"
import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  let history = useNavigate()




  // Get all notes
  const getNotes = async () => {

    if (localStorage.getItem('token')) {



      //API call
      const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem("token"),
        }
      });
      const json = await response.json()
      setNotes(json)
    } else (
      history('/login')
    )

  }
  // Add Note 
  const addNote = async (title, description, tag) => {

    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag })

    });
    const note = await response.json();

    setNotes(notes.concat(note))

  }

  // Delete a note 
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem("token"),
      }
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag })
    });
    let json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)


  }


  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState