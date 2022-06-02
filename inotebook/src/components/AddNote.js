import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const { showAlert } = props
    const context = useContext(noteContext)
    const { addNote } = context

    const [note, setNotes] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNotes({ title: "", description: "", tag: "" })
        showAlert("New Note added","success")    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <div className="container my-3 ">
            <h2>Add a Note</h2>
            <form className="my-3" onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Add Note</button>
            </form>
        </div>)
}

export default AddNote