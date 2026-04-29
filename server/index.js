const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

// Conectare la MongoDB
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });


// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});
app.use(express.json());
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
 { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
 { id: 2, title: "Calculator Buget", tech: "JS", done: true },
 { id: 3, title: "Dashboard React", tech: "React", done: false },
 { id: 4, title: "API Meteo", tech: "React, API", done: false },
];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
 res.json(projects);
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects/:id', function(req, res) {
 const project = projects.find(p => p.id === parseInt(req.params.id));
 if (project) {
   res.json(project);
 } else {
   res.status(404).json({ message: 'Proiectul nu a fost gasit' });
 }
});
// GET /api/stats - returneaza statistici despre proiecte
app.get('/api/stats', function(req, res) {
 const total = projects.length;
 const done = projects.filter(p => p.done).length;
 const pending = total - done;
 res.json({ total, done, pending });
});
// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
 const newProject = {
 id: projects.length + 1,
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 };
 projects.push(newProject);
 res.status(201).json(newProject);
});
// DELETE /api/projects/:id - sterge un proiect
app.delete('/api/projects/:id', function(req, res) {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if(index === -1) res.status(404).json({ error: 'Not found' })
    else {
        projects.splice(index, 1);
        res.json({ message: 'Proiectul a fost sters' });
    }
})
// PUT /api/projects/:id - actualizeaza un proiect
app.put('/api/projects/:id', function(req, res) {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(project) {
        project.title = req.body.title;
        project.tech = req.body.tech;
        project.done = req.body.done;
        res.json(project);
    }
});
// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});
