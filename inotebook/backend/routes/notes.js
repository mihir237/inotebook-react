const express = require("express")
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')


// Router 1: get all nptes using: GET "api/notes/fetchallnotes". Loging Required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")

    }
})

// Router 2: Add a new Note using: POST "api/notes/addnpte". Login Required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', "description must be note empty").isLength({ min: 0 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // if there are errors, return Bad request and the error 
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 3: Update a Note using: PUT "api/notes/updatenote/:id". Login Required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    try {
        
   
    const {title, description, tag} = req.body;

    // create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    //find note to be update 
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowd")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note}) } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// Router 2: Delete a Note using: DELETE "api/notes/delete". Login Required
router.delete('/delete/:id', fetchuser,async(req,res)=>{
try {
    //  find note to delete
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(401).send("Not allowd")}

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note: note})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error!!!")
}

})

module.exports = router