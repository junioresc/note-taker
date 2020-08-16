const path = require(`path`);
const router = require(`express`).Router();
let { notes } = require(`../../db/db.json`);

router.get(`/notes`, (req, res) => {
    let results = notes;
    res.json(results);
});

router.post(`/notes`, (req, res) => {
    req.body.id = notes.length.toString();

    const note = req.body;
    notes.push(note);
    res.json(note);
});

router.delete(`/notes/:id`, (req, res) => {
    const { id } = req.params;
    const deleted = notes.find(note => note.id === id);
    if(deleted) {
        notes = notes.filter(note => note.id !== id);
        res.status(200).json(deleted);
    } else {
        res.send(404);
    }
});

module.exports = router;