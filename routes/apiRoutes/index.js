const path = require(`path`);
const router = require(`express`).Router();
const fs = require(`fs`);
const uniqid = require(`uniqid`);
let { notes } = require(`../../db/db.json`);

router.get(`/notes`, (req, res) => {
    res.json(notes);
});

router.post(`/notes`, (req, res) => {
    req.body.id = uniqid();

    const note = req.body;
    notes.push(note);
    fs.writeFileSync(path.join(__dirname, `../../db/db.json`),
     JSON.stringify({ notes: notes }, null, 2)
     );
    res.json(note);
});

router.delete(`/notes/:id`, (req, res) => {
    const { id } = req.params;
    const deleted = notes.find(note => note.id === id);
    if(deleted) {
        notes = notes.filter(note => note.id !== id);
        fs.writeFileSync(path.join(__dirname, `../../db/db.json`),
         JSON.stringify({ notes: notes }, null, 2)
         );
        res.status(200).json(deleted);
    } else {
        res.send(404);
    }
});

module.exports = router;